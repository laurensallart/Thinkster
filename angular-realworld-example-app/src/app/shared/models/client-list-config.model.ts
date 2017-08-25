export class ClientListConfig {
  type: string = 'all';

  filters: {
    firstName?: string,
    lastName?: string,
    limit?: number,
    offset?: number
  } = {};
}
