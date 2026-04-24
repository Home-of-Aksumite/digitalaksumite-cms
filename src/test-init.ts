import { getPayload } from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const test = async () => {
  try {
    const payload = await getPayload({
      config: (await import('./payload.config.js')).default,
    });
    console.log('✓ Payload initialized successfully!');
    console.log('Collections:', Object.keys(payload.collections || {}));
    console.log('Globals:', Object.keys(payload.globals || {}));
    process.exit(0);
  } catch (err) {
    console.error('✗ Payload initialization failed:', err);
    process.exit(1);
  }
};

test();
