import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
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
    return this.transactions;
  }

  public getBalance(): Balance {

    let income = 0;
    let outcome = 0;

    for (let i = 0; i < this.transactions.length; i++) {
      if(this.transactions[i].type === 'income') income += this.transactions[i].value;
      else if(this.transactions[i].type === 'outcome') outcome += this.transactions[i].value;
    }

    const balance = {
      income: income,
      outcome: outcome,
      total: income - outcome
    }
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO ): Transaction {

    if(type === 'outcome' && this.getBalance().total < value){
      console.log('Erro')
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
