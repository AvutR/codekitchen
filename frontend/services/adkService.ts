import { AdkConfig } from '../types';

export const createSession = async (config: AdkConfig, userId: string): Promise<string> => {
  const { projectId, locationId, agentId, accessToken } = config;
  const name = `projects/${projectId}/locations/${locationId}/reasoningEngines/${agentId}`;
  const url = `https://${locationId}-aiplatform.googleapis.com/v1/${name}:query`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      input: { user_id: userId },
      classMethod: 'async_create_session'
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create session: ${err}`);
  }
  const data = await response.json();
  return data.output.id;
};

export async function* streamQuery(config: AdkConfig, sessionId: string, userId: string, message: string) {
  const { projectId, locationId, agentId, accessToken } = config;
  const name = `projects/${projectId}/locations/${locationId}/reasoningEngines/${agentId}`;
  const url = `https://${locationId}-aiplatform.googleapis.com/v1/${name}:streamQuery`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      input: {
        user_id: userId,
        session_id: sessionId,
        message: message
      },
      classMethod: 'async_stream_query'
    })
  });

  if (!response.ok) {
     const err = await response.text();
     throw new Error(`Failed to stream query: ${err}`);
  }
  if (!response.body) throw new Error('No response body');

  const decoder = new TextDecoder();
  
  // Using for await...of as required by the ADK streaming specification
  for await (const chunk of response.body as any) {
    const chunkText = decoder.decode(chunk, { stream: true });
    
    // Handle potential multiple JSON objects separated by newlines (ndjson format)
    const lines = chunkText.split('\n').filter(line => line.trim() !== '');
    for (const line of lines) {
      try {
        yield JSON.parse(line);
      } catch (e) {
        console.warn('Failed to parse JSON chunk:', line);
      }
    }
  }
}
