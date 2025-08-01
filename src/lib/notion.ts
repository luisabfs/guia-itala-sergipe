import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export interface NotionTour {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  departureTime: string;
  returnTime: string;
  included: string[];
  notIncluded: string[];
  category: 'praias' | 'cultural' | 'ecologico';
  price?: string;
  duration?: string;
  maxGroupSize?: number;
  difficulty?: 'facil' | 'moderado' | 'dificil';
  highlights?: string[];
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getTours(): Promise<NotionTour[]> {
  if (!DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID environment variable is not set');
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Ativo',
        checkbox: {
          equals: true,
        },
      },
      // No sorting for now - will add back once we know the correct property name
    });

    const tours: NotionTour[] = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || '',
        description: properties.Descrição?.rich_text?.[0]?.plain_text || '',
        imageUrl: page.cover?.external?.url || page.cover?.file?.url || '',
        departureTime: properties.Saída?.rich_text?.[0]?.plain_text || '',
        returnTime: properties.Retorno?.rich_text?.[0]?.plain_text || '',
        included: properties.Incluído?.multi_select?.map((item: any) => item.name) || [],
        notIncluded: properties.NãoIncluído?.multi_select?.map((item: any) => item.name) || [],
        category: properties.Categoria?.select?.name?.toLowerCase() || 'praias',
        price: properties.Preço?.rich_text?.[0]?.plain_text || '',
        duration: properties.Duração?.rich_text?.[0]?.plain_text || '',
        maxGroupSize: properties.TamanhoMáximoGrupo?.number || 0,
        difficulty: properties.Dificuldade?.select?.name?.toLowerCase() || 'moderado',
        highlights: properties.Destaques?.multi_select?.map((item: any) => item.name) || [],
        requirements: properties.Requisitos?.multi_select?.map((item: any) => item.name) || [],
        createdAt: page.created_time,
        updatedAt: page.last_edited_time,
      };
    });

    return tours;
  } catch (error) {
    console.error('Error fetching tours from Notion:', error);
    throw new Error(`Failed to fetch tours from Notion: ${error}`);
  }
}

export async function getTourById(id: string): Promise<NotionTour | null> {
  try {
    const response = await notion.pages.retrieve({ page_id: id });
    const properties = (response as any).properties;

    return {
      id: response.id,
      title: properties.Title?.title?.[0]?.plain_text || '',
      description: properties.Descrição?.rich_text?.[0]?.plain_text || '',
      imageUrl: (response as any).cover?.external?.url || (response as any).cover?.file?.url || '',
      departureTime: properties.Saída?.rich_text?.[0]?.plain_text || '',
      returnTime: properties.Retorno?.rich_text?.[0]?.plain_text || '',
      included: properties.Incluído?.multi_select?.map((item: any) => item.name) || [],
      notIncluded: properties.NãoIncluído?.multi_select?.map((item: any) => item.name) || [],
      category: properties.Categoria?.select?.name?.toLowerCase() || 'praias',
      price: properties.Preço?.rich_text?.[0]?.plain_text || '',
      duration: properties.Duração?.rich_text?.[0]?.plain_text || '',
      maxGroupSize: properties.TamanhoMáximoGrupo?.number || 0,
      difficulty: properties.Dificuldade?.select?.name?.toLowerCase() || 'moderado',
      highlights: properties.Destaques?.multi_select?.map((item: any) => item.name) || [],
      requirements: properties.Requisitos?.multi_select?.map((item: any) => item.name) || [],
      createdAt: (response as any).created_time || new Date().toISOString(),
      updatedAt: (response as any).last_edited_time || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching tour from Notion:', error);
    return null;
  }
}

export async function getToursByCategory(category: string): Promise<NotionTour[]> {
  if (!DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID environment variable is not set');
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Ativo',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Categoria',
            select: {
              equals: category.charAt(0).toUpperCase() + category.slice(1),
            },
          },
        ],
      },
      // No sorting for now - will add back once we know the correct property name
    });

    const tours: NotionTour[] = response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || '',
        description: properties.Descrição?.rich_text?.[0]?.plain_text || '',
        imageUrl: page.cover?.external?.url || page.cover?.file?.url || '',
        departureTime: properties.Saída?.rich_text?.[0]?.plain_text || '',
        returnTime: properties.Retorno?.rich_text?.[0]?.plain_text || '',
        included: properties.Incluído?.multi_select?.map((item: any) => item.name) || [],
        notIncluded: properties.NãoIncluído?.multi_select?.map((item: any) => item.name) || [],
        category: properties.Categoria?.select?.name?.toLowerCase() || 'praias',
        price: properties.Preço?.rich_text?.[0]?.plain_text || '',
        duration: properties.Duração?.rich_text?.[0]?.plain_text || '',
        maxGroupSize: properties.TamanhoMáximoGrupo?.number || 0,
        difficulty: properties.Dificuldade?.select?.name?.toLowerCase() || 'moderado',
        highlights: properties.Destaques?.multi_select?.map((item: any) => item.name) || [],
        requirements: properties.Requisitos?.multi_select?.map((item: any) => item.name) || [],
        createdAt: page.created_time,
        updatedAt: page.last_edited_time,
      };
    });

    return tours;
  } catch (error) {
    console.error('Error fetching tours by category from Notion:', error);
    throw new Error('Failed to fetch tours by category from Notion');
  }
} 