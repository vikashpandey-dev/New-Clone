import XLSX from 'xlsx';
export const downloadexcel=(data)=>{
      // Create a new worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      // Create a new workbook with the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // Generate a blob containing the workbook in Excel format
      const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'blob' });
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
      // Clean up
      URL.revokeObjectURL(url);
}