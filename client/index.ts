import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022',
    }),
  ],
});

async function main() {
  // set cookie
  await client.setCookie.mutate('🍪');

  // set another cookie
  await client.setCookie.mutate('🍪');

  // set cookies
  const cookies = await client.getCookie.query();
  console.log(cookies);
}

void main();
