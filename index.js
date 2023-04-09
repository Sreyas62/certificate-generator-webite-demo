const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
const pdfInput = document.getElementById('pdf-input');

pdfInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  // Call your function and pass the file object
  handleFile(selectedFile);
});

async function modifyPdf() {
  
  // Fetch an existing PDF document
  const url = "./newcertificate.pdf";
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Get the first page of the document
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize()
  //get value from input
  const x = 5;

  // Draw a string of text diagonally across the first page
  firstPage.drawText('This text was added with JavaScript!', {
    x: x,
    y: height / 2,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    
  })
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      document.getElementById('pdf').src = pdfDataUri;

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()

  // Add an event listener to the button that triggers the download
  const downloadButton = document.getElementById('download-pdf-btn');
  downloadButton.addEventListener('click', () => {
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
  });
}

const modifyPdfBtn = document.getElementById('modify-pdf-btn');
modifyPdfBtn.addEventListener('click', modifyPdf);
