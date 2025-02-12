import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Path to your JSON file
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Helper function to read the database
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { records: [] };
  }
}

// Helper function to write to the database
async function writeDB(data: any) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
    throw new Error('Failed to write to database');
  }
}

// GET handler
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('_page') || '1');
    const limit = parseInt(searchParams.get('_limit') || '10');
    const sort = searchParams.get('_sort');
    const order = searchParams.get('_order');
    const search = searchParams.get('q');

    const db = await readDB();
    let filteredData = [...db.records];

    // Apply search filter if provided
    if (search) {
      filteredData = filteredData.filter(record => 
        Object.values(record).some(value => 
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Apply sorting if provided
    if (sort && order) {
      filteredData.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] > b[sort] ? 1 : -1;
        }
        return a[sort] < b[sort] ? 1 : -1;
      });
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Set total count header
    const headers = new Headers();
    headers.set('x-total-count', filteredData.length.toString());

    return NextResponse.json(paginatedData, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();
    
    // Generate new ID
    const newId = Math.max(...db.records.map((r: any) => r.id), 0) + 1;
    
    const newRecord = {
      id: newId,
      ...body,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    db.records.push(newRecord);
    await writeDB(db);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const db = await readDB();
    const index = db.records.findIndex((r: any) => r.id === parseInt(id));

    if (index === -1) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    const updatedRecord = {
      ...db.records[index],
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    db.records[index] = updatedRecord;
    await writeDB(db);

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const db = await readDB();
    const index = db.records.findIndex((r: any) => r.id === parseInt(id));

    if (index === -1) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    const deletedRecord = db.records[index];
    db.records.splice(index, 1);
    await writeDB(db);

    return NextResponse.json(deletedRecord, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}