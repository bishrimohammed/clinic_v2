const { PdfService } = require("../../service/pdfService");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const getClinicInformation = require("../../helpers/getClinicInformation");
const getLocalFile = require("../../utils/getLocalFile");
const puppeteer = require("puppeteer");
const path = require("path");

// const fs = require("fs");

const getBase64Image = (filePath) => {
  const image = fs.readFileSync(filePath);
  return `data:image/png;base64,${image.toString("base64")}`; // Change the mime type if needed
};
const printLabResult = asyncHandler(async (req, res) => {
  // const pdfService = new PdfService();
  const data = [
    { name: "John Doe", age: "34", marital: "married" },
    { name: "Jane Smith", age: "28", marital: "single" },
    { name: "Alice Johnson", age: "45", marital: "divorced" },
    { name: "Bob Brown", age: "50", marital: "married" },
    { name: "Charlie Davis", age: "22", marital: "single" },
    { name: "Diana Evans", age: "30", marital: "married" },
    { name: "Ethan White", age: "39", marital: "single" },
    { name: "Fiona Green", age: "27", marital: "married" },
    { name: "George Black", age: "41", marital: "divorced" },
    { name: "Hannah Adams", age: "36", marital: "married" },
    { name: "Ian Wilson", age: "29", marital: "single" },
    { name: "Julia Clark", age: "32", marital: "married" },
    { name: "Kevin Lewis", age: "38", marital: "single" },
    { name: "Laura Hall", age: "25", marital: "married" },
    { name: "Michael Allen", age: "46", marital: "divorced" },
    { name: "Nina Young", age: "31", marital: "single" },
    { name: "Oliver King", age: "37", marital: "married" },
    { name: "Paula Wright", age: "44", marital: "single" },
    { name: "Quentin Scott", age: "26", marital: "married" },
    { name: "Rachel King", age: "40", marital: "divorced" },
    { name: "John Doe", age: "34", marital: "married" },
    { name: "Jane Smith", age: "28", marital: "single" },
    { name: "Alice Johnson", age: "45", marital: "divorced" },
    { name: "Bob Brown", age: "50", marital: "married" },
    { name: "Charlie Davis", age: "22", marital: "single" },
    { name: "Diana Evans", age: "30", marital: "married" },
    { name: "Ethan White", age: "39", marital: "single" },
    { name: "Fiona Green", age: "27", marital: "married" },
    { name: "George Black", age: "41", marital: "divorced" },
    { name: "Hannah Adams", age: "36", marital: "married" },
    { name: "Ian Wilson", age: "29", marital: "single" },
    { name: "Julia Clark", age: "32", marital: "married" },
    { name: "Kevin Lewis", age: "38", marital: "single" },
    { name: "Laura Hall", age: "25", marital: "married" },
    { name: "Michael Allen", age: "46", marital: "divorced" },
    { name: "Nina Young", age: "31", marital: "single" },
    { name: "Oliver King", age: "37", marital: "married" },
    { name: "Paula Wright", age: "44", marital: "single" },
    { name: "Quentin Scott", age: "26", marital: "married" },
    { name: "Rachel King", age: "40", marital: "divorced" },
    { name: "John Doe", age: "34", marital: "married" },
    { name: "Jane Smith", age: "28", marital: "single" },
    { name: "Alice Johnson", age: "45", marital: "divorced" },
    { name: "Bob Brown", age: "50", marital: "married" },
    { name: "Charlie Davis", age: "22", marital: "single" },
    { name: "Diana Evans", age: "30", marital: "married" },
    { name: "Ethan White", age: "39", marital: "single" },
    { name: "Fiona Green", age: "27", marital: "married" },
    { name: "George Black", age: "41", marital: "divorced" },
    { name: "Hannah Adams", age: "36", marital: "married" },
    { name: "Ian Wilson", age: "29", marital: "single" },
    { name: "Julia Clark", age: "32", marital: "married" },
    { name: "Kevin Lewis", age: "38", marital: "single" },
    { name: "Laura Hall", age: "25", marital: "married" },
    { name: "Michael Allen", age: "46", marital: "divorced" },
    { name: "Nina Young", age: "31", marital: "single" },
    { name: "Oliver King", age: "37", marital: "married" },
    { name: "Paula Wright", age: "44", marital: "single" },
    { name: "Quentin Scott", age: "26", marital: "married" },
    { name: "Rachel King", age: "40", marital: "divorced" },
  ];

  const clinic = await getClinicInformation();
  // console.log(clinic?.logo);
  const logo = await getLocalFile(clinic.logo);

  const logoFullPath = path.resolve(__dirname, "../../public/", clinic.logo);
  console.log(logoFullPath);
  const logoBase64 = getBase64Image(logoFullPath);
  // let filePath

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let tableBody = "";
  data.map(
    (item) =>
      (tableBody += `
    <tr>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.marital}</td>
    </tr>`)
  );
  await page.setContent(`
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <title>pdf test</title>
  </head>
  <body>
    <div class="">
      <header class="d-flex align-items-center">
      <img src="${logoBase64}" width="60" height="60"/>
        <h3 class="">${clinic?.name}</h3>
      </header>
      <hr/>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Marital</th>
          </tr>
        </thead>
        <tbody>
       ${tableBody}
        </tbody>
      </table>
      
    </div>
  </body>
</html>`);
  const filePath = `${process.cwd()}/output.pdf`;
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,

    displayHeaderFooter: true,
    headerTemplate: "",
    footerTemplate: `
    <div style="font-size: 10px; width: 100%; text-align: center;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
        <div style="font-size: 10px; width: 100%; text-align: center; position: absolute; bottom: 10px; left: 0; right: 0;">
          Clinic Address: 123 Health St, Wellness City, HC 12345
        </div>
  
      `,
    margin: {
      bottom: 100,
      left: 10,
      right: 10,
      top: 20,
    },
  });
  // const filePath = await pdfService.render();
  await browser.close();
  // console.log(filePat);
  res.setHeader("Content-disposition", "attachment; filename=output.pdf");
  res.setHeader("Content-type", "application/pdf");
  res.sendFile(filePath, {}, (err) => {
    if (err) {
      console.error(err);
    }
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Remove the temporary PDF file
    } // Remove the temporary PDF file
  });
  //   await pdfService.addNewLine();
  // pdfService.doc.setLineHeightFactor(1.2);

  // await pdfService.addImage(logo, { width: 60, height: 60 });
  // await pdfService.addHorizontalLine();
  // await pdfService.addText("hello");
  // //   await pdfService.addNewLine();
  // //   pdfService.doc.setFontSize(10);
  // await pdfService.addText("subHeading");
  // //   await pdfService.addNewLine();
  // await pdfService.addText(
  //   "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta nemo itaque recusandae natus voluptas, sapiente nobis ratione alias placeat ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro cum consequatur, cupiditate hic rem quidem aliquid minima debitis perspiciatis doloribus modi id praesentium a obcaecati soluta! Vel quo illo omnis?"
  // );
  // await pdfService.addGenericTable(data, {
  //   ignoreFields: ["age"],
  //   tableName: "Users Table",
  //   addToIndex: false, //add to TOC
  //   theme: "grid",
  // });
});
module.exports = {
  printLabResult,
};
