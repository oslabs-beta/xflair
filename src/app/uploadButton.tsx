// import React, { ChangeEvent, useState } from 'react';
// import { Upload } from './lib/definitions';
// import { uploadImage } from './lib/actions';

// const UploadButton: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<Object | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     console.log('Selected file:', file);
//     setSelectedFile(file ? file : null);
//   };

//   const handleUpload = () => {
//     // if (selectedFile) {
//     //   const formData = new FormData();
//     //   formData.append('file', selectedFile);
//     //   fetch('/api/upload', {
//     //     method: 'POST',
//     //     body: formData,
//     //   })
//     //     .then((response) => response.json())
//     //     .then((data) => {
//     //       console.log('File uploaded:', data);
//     //     })
//     //     .catch((error) => {
//     //       console.error('Error uploading file:', error);
//     //     });
//     // }
//   };

//   return (
//     <form action={uploadImage}>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadButton;

// // <div>
// //   <input type="file" accept="image/*" onChange={handleFileChange} />
// //   <button onClick={handleUpload}>Upload</button>
// // </div>
