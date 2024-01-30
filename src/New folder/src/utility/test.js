const formData = new FormData();
console.log(record.EMPL_ID, customFolderName);

// Append fileInfo to formData
formData.append('F', fileInfo.buffer, { filename: fileInfo.displayName });
formData.append('VolumeIndex', '8');
formData.append('FolderName', record.EMPL_ID);
formData.append('RootFolderPath', `procdoc/ALUMNIA/PFONLINE/${customFolderName}`);
formData.append('DocumentDataDefList', `<DocDataDefinition><DataClassDoc>ALUMNIA_DOCUMENT</DataClassDoc><DocField><DocIndexName>EmpID</DocIndexName><DocIndexId>617</DocIndexId><DocIndexValue>${record.EMPL_ID}</DocIndexValue><DocIndexType>S</DocIndexType></DocField></DocDataDefinition>`);
formData.append('FolderDataDefList', `<DataDefinition><DataClassNamFold>ALUMNIA_FOLDER</DataClassNamFold><Field><IndexName>EmpID</IndexName><IndexId>615</IndexId><IndexValue>${record.EMPL_ID}</IndexValue><IndexType>S</IndexType></Field></DataDefinition>`);
formData.append('CabinetName', 'procdoc');
formData.append('UserDBId', response.NGOConnectCabinet_Output.UserDBIds);
formData.append('jtsIpAddress', '10.50.75.21');
formData.append('jtsPort', '7801');
formData.append('DocumentName', 'APPFORM');
formData.append('VersionFlag', 'N');

// Include fileInfo in the payload
formData.append('FileName', fileInfo.name);
formData.append('FileDisplayName', fileInfo.displayName);

const fetchResponse = await fetch(url, {
  method: 'POST',
  body: formData,
  headers: { ...formData.getHeaders() },
});

// Handle the response as needed
const responseData = await fetchResponse.json();
console.log('Response:', responseData);
