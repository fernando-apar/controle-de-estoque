
import type { Product, Movement } from '../types';

declare const jspdf: any;

export const exportToCSV = <T,>(data: T[], filename: string): void => {
  if (data.length === 0) {
    alert('Nenhum dado para exportar.');
    return;
  }
  
  const headers = Object.keys(data[0] as object);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let value = (row as any)[header];
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


export const exportProductsToPDF = (products: Product[]): void => {
  if (products.length === 0) {
    alert('Nenhum produto para exportar.');
    return;
  }
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text('Relatório de Estoque Atual', 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);

  const tableColumn = ["Código", "Nome", "Categoria", "Qtd.", "Preço Venda"];
  const tableRows: any[] = [];

  products.forEach(product => {
    const productData = [
      product.internalCode,
      product.name,
      product.category,
      product.quantity,
      `R$ ${product.sellPrice.toFixed(2)}`,
    ];
    tableRows.push(productData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 30 });
  doc.save('relatorio_estoque.pdf');
};

export const exportMovementsToPDF = (movements: Movement[]): void => {
  if (movements.length === 0) {
    alert('Nenhuma movimentação para exportar.');
    return;
  }
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text('Relatório de Movimentações', 14, 16);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);

  const tableColumn = ["Data", "Produto", "Tipo", "Qtd.", "Motivo"];
  const tableRows: any[] = [];

  movements.forEach(movement => {
    const movementData = [
      new Date(movement.date).toLocaleString('pt-BR'),
      movement.productName,
      movement.type,
      movement.quantity,
      movement.reason
    ];
    tableRows.push(movementData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 30 });
  doc.save('relatorio_movimentacoes.pdf');
};
