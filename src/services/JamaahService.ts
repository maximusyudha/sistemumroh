import { Jamaah } from '../interface/Jamaah';

const API_URL = '/api/jamaah';

const JamaahService = {
  getAll: async (): Promise<Jamaah[]> => {
    const response = await fetch(API_URL);
    return response.json();
  },
  getById: async (id: string): Promise<Jamaah> => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },
  add: async (data: FormData): Promise<Jamaah> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: data, // No need to set Content-Type headers when using FormData; fetch will do it automatically
    });

    if (!response.ok) {
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
      throw new Error('Failed to update Jamaah');
    }

    return response.json();
  },
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('Failed to delete Jamaah');
    }
  },
};

export default JamaahService;
