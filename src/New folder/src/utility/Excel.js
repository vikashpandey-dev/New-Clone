const Downloadexcel = async (res, filename) => {
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";
  //  const table = document.createElement('table');
  const worksheet = XLSX.utils.json_to_sheet(res);
  const workbook = {
    Sheets: {
      data: worksheet,
    },
    SheetNames: ["data"],
  };
  const excelBuffer = XLSX.write(workbook,{
    bookType: "xlsx",
    type: "array",
  });
  saveAsExcel(excelBuffer, filename);
};
function saveAsExcel(buffer, filename) {
  const currdate = new Date();
  let fulltime = `${currdate.toLocaleDateString()}_${currdate.getHours()} ${currdate.getMinutes()}_${currdate.getSeconds()}`;
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, filename + "_" + fulltime + EXCEL_EXTENSION);
}
export default Downloadexcel;
