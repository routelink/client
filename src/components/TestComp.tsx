import React from 'react';
import { useComponents } from '@app/utils/useComponents.tsx';

const TestComp: React.FC = () => {
  const { RLTable } = useComponents();
  const columns = [
    {
      field: 'studentId',
      title: 'ID',
      align: 'right',
      type: 'default',
      width: 100
    },
    {
      field: 'name',
      title: 'Имя',
      align: 'right',
      type: 'default',
      width: 100
    },
    {
      field: 'group',
      title: 'group',
      type: 'default',
      align: 'right',
      width: 100
    },
    {
      field: 'age',
      title: 'group',
      type: 'default',
      align: 'right',
      width: 100
    },

  ];
  const rows =  [
    { studentId: 1, name: "Алексей", group: "ИУ6-64", age: 21, averageGrade: 4.5 },
    { studentId: 2, name: "Мария", group: "ИУ6-64", age: 20, averageGrade: 4.3 },
    { studentId: 3, name: "Екатерина", group: "ИУ6-62", age: 22, averageGrade: 4.8 },
    { studentId: 4, name: "Никита", group: "ИУ6-61", age: 19, averageGrade: 3.9 },
    { studentId: 5, name: "Дмитрий", group: "ИУ6-61", age: 20, averageGrade: 4.1 },
    { studentId: 6, name: "Иван", group: "ИУ6-63", age: 21, averageGrade: 4.6 },
    { studentId: 7, name: "Татьяна", group: "ИУ6-63", age: 22, averageGrade: 4.7 },
    { studentId: 8, name: "Сергей", group: "ИУ6-64", age: 20, averageGrade: 4.2 },
    { studentId: 9, name: "Вера", group: "ИУ6-62", age: 19, averageGrade: 4.4 },
    { studentId: 10, name: "Олег", group: "ИУ6-61", age: 21, averageGrade: 4.0 }
  ];
  return <>
    <RLTable columns={columns} data={rows} rowKeyName={'studentId'} availableActions={{edit: true, remove: true}}></RLTable>
  </>;
};
export default TestComp;