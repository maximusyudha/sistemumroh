import { Jamaah } from '../interface/Jamaah';

const API_URL = '/api/jamaah'; 

const JamaahService = {
  getAll: async (): Promise<Jamaah[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error('Failed to fetch Jamaah data');
    }
    return response.json();
  },
  
  getById: async (id: string): Promise<Jamaah> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      console.error(`Failed to fetch Jamaah with id ${id}`);
    }
    return response.json();
  },
  
  add: async (data: FormData): Promise<Jamaah> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: data,
    });
  
    if (!response.ok) {
      const errorBody = await response.text(); 
      console.error('Error response:', errorBody);
      throw new Error('Failed to create Jamaah');
    }
  
    return response.json();
  },
  
  update: async (id: string, data: Jamaah): Promise<Jamaah> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Jamaah with id ${id}`);
    }

    return response.json();
  },
  
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      console.error(`Failed to delete Jamaah with id ${id}`);
    }
  },
};

export default JamaahService;
