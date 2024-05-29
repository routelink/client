import { makeAutoObservable } from 'mobx';

import { AddTransport, ITransport } from '@app/models';
import { TransportService } from '@app/services';

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

  async getData(query: string) {
    const data = (await this.transportService.getRows(query)) as { rows: ITransport[] };

    this.setTableData(data.rows);
  }

  async onRowAdd(payload: AddTransport) {
    const newRow = {
      ...payload,
      typeId: +payload.typeId,
    };
    const row = await this.transportService.addRow(newRow);

    if (row) {
      this.tableData = [row, ...this.tableData];
    }
    //api.onRowAdd
  }

  async onRowEdit(payload: AddTransport, id: number) {
    const newRow = {
      ...payload,
      typeId: +payload.typeId,
    };
    const rowIndex = this.tableData.findIndex((row) => row.id === id);

    const row = await this.transportService.editRow(newRow, id);

    if (row && rowIndex !== -1) {
      this.tableData = [
        ...this.tableData.slice(0, rowIndex),
        row,
        ...this.tableData.slice(rowIndex + 1),
      ];
    }
  }

  async onRowDelete(id: number) {
    if (await this.transportService.deleteRow(id)) {
      this.tableData = this.tableData.filter((row) => row.id !== id);
    }

    // api.onRowDelete
  }
}

export default new TransportStore();
