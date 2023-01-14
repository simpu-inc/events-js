export class SimpuEventsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SimpuEventsError';
  }
}
