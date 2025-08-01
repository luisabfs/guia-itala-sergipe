import { NextResponse } from 'next/server';
import { getTours, getToursByCategory } from '@/lib/notion';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    console.log('API Route: Fetching tours with category:', category);

    let tours;
    if (category && category !== 'all') {
      tours = await getToursByCategory(category);
    } else {
      tours = await getTours();
    }

    console.log('API Route: Successfully fetched', tours.length, 'tours');

    return NextResponse.json({ tours });
  } catch (error: any) {
    console.error('API Error Details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch tours',
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
} 