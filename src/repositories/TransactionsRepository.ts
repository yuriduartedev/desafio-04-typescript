import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .map(item => item.value)
      .map(item => Number(item))
      .reduce((accum, curr) => accum + curr, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(item => item.value)
      .map(item => Number(item))
      .reduce((accum, curr) => accum + curr, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
