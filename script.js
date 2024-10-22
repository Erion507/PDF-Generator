const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';
document.head.appendChild(script);

let loadedPdfDoc = null;

function loadPDF() {
  const fileInput = document.getElementById('pdfUpload');
  const file = fileInput.files[0];

  if (file && file.type === 'application/pdf') {
    const reader = new FileReader();
    
    reader.onload = async function (event) {
      const arrayBuffer = event.target.result;
      loadedPdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
      alert("PDF Loaded! Now fill out the fields and generate.");
    };

    reader.readAsArrayBuffer(file);
  } else {
    alert('Please upload a valid PDF file.');
  }
}

async function generatePDF() {
  if (!loadedPdfDoc) {
    alert('Please upload a PDF template first!');
    return;
  }

  const name = document.getElementById('nameInput').value;
  const positionInput = document.getElementById('positionInput').value;
  const date = document.getElementById('dateInput').value;
  const departament = document.getElementById('departamentInput').value;
  const equipment = document.getElementById('equipmentInput').value;
  const serialNumber = document.getElementById('serialInput').value;
  const provided = document.getElementById('providedInput').value;
  const condition = document.getElementById('conditionInput').value;
  const pdfFileName = document.getElementById('pdfFileName').value || 'filled_template';

  const pdfDoc = await PDFLib.PDFDocument.create();
  const [templatePage] = await pdfDoc.copyPages(loadedPdfDoc, [0]);

  pdfDoc.addPage(templatePage);

  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  const page = pdfDoc.getPage(0);


  page.drawText(name, {
    x: 143,
    y: 611,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(positionInput, {
    x: 153,
    y: 596,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(date, {
    x: 163,
    y: 581,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(departament, {
    x: 173,
    y: 566,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(equipment, {
    x: 212,
    y: 506,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(serialNumber, {
    x: 184,
    y: 490.5,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(provided, {
    x: 239,
    y: 475.5,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  page.drawText(condition, {
    x: 228,
    y: 459.5,
    size: 11,
    font: font,
    color: PDFLib.rgb(0, 0, 0),
  });

  
  const pdfBytes = await pdfDoc.save();

  
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = pdfFileName + '.pdf';
  link.click();
}
