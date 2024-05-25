import { makeAutoObservable } from 'mobx';

import { TransportAddState } from '@app/components/TransportManagement/TransportAddForm.tsx';
import { GetItemsParams, ITransport } from '@app/models';
import { TransportService } from '@app/services';

// const fieldDescription = {
//   id: 'int' as const, // auto-increment,
//   name: 'str' as const,
//   type: {
//     name: 'str',
//   } as const,
//   organisation: 'str' as const,
//   regNumber: 'int' as const,
//   avgConsumption: 'float' as const,
//   createdAt: 'date' as const, //@Todo add type
// };

export class TransportStore {
  tableData: ITransport[];
  private readonly transportService = new TransportService();

  constructor() {
    this.tableData = [];
    makeAutoObservable(this);
  }

  setTableData(value: ITransport[]) {
    this.tableData = value;
  }

  async getData(params: GetItemsParams) {
    const data = (await this.transportService.getRows(params)) as { rows: ITransport[] };

    this.setTableData(data.rows);
  }

  onRowAdd(payload: TransportAddState): void {
    const newRow = {
      ...payload,
      name: 'FILL',
    };
    this.tableData = [...this.tableData, newRow];
    //api.onRowAdd
  }

  onRowDelete(id: number) {
    this.tableData = this.tableData.filter((row) => row.id !== id);
    // api.onRowDelete
  }

  onRowEdit(payload: ITransport) {
    const { id } = payload;
    const rowIndex = this.tableData.findIndex((row) => row.id === id);
    if (rowIndex) {
      this.tableData = [
        ...this.tableData.slice(0, rowIndex),
        payload,
        ...this.tableData.slice(rowIndex + 1),
      ];
    }
    // api.onRowEdit
  }
}

export default new TransportStore();
