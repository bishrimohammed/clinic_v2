const { jsPDF } = require("jspdf");
const autoTable = require("jspdf-autotable");
const getClinicInformation = require("../helpers/getClinicInformation");
const getLocalFile = require("../utils/getLocalFile");
async function addHeader(doc) {
  const clinic = await getClinicInformation();
  // console.log(clinic);
  const logo = await getLocalFile(clinic.logo);
  await doc.addImage(
    logo,
    "PNG",

    // this.x,
    // this.y,
    60,
    60
  );
  // this.y += 60;
  // doc.setFontSize(12);
  // await doc.text("dkjsvbc,jsdhv");
  // this.updatePointer();
}
class PdfService {
  doc;
  filePath = "./output.pdf";
  xMargin = 20;
  yMargin = 30;
  indexData = [];
  x;
  y;

  defaultTableOptions = {
    tableName: "default table name",
    ignoreFields: [],
    addToIndex: false,
  };

  constructor() {
    this.doc = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
    this.resetXandY();
    this.updatePointer();
  }

  resetXandY() {
    this.x = this.xMargin;
    this.y = this.yMargin;
  }

  updatePointer() {
    this.doc.moveTo(this.x, this.y);
  }

  async addNewPage() {
    this.doc.addPage();
    this.resetXandY();
    this.updatePointer();
  }

  // Adds image at position (x, y) with width and height
  async addImage(imageData, options) {
    console.log(options);

    this.doc.addImage(
      imageData,
      "PNG",

      options?.x || this.x,
      options?.y || this.y,
      options?.width || this.doc.internal.pageSize.getWidth(),
      options?.height || this.doc.internal.pageSize.getHeight()
    );
    // console.log(this.y);

    this.y += (options?.height || 60) + this.doc.getLineHeight(); // Adding margin after the image
    // console.log(this.y);
    this.updatePointer();
    // console.log(this.y);
  }

  async addGenericTable(dataArr, options) {
    if (dataArr.length === 0) {
      console.log(dataArr.length);

      console.error("Data array is empty");
      return;
    }

    const mergedOptions = {
      ...this.defaultTableOptions,
      ...options,
      startY: this.y + this.doc.getLineHeight(),
      margin: {
        top: this.xMargin,
        right: this.xMargin,
        bottom: 40,
        left: this.xMargin,
      },
    };
    // console.log("gvmhg");
    // console.log(mergedOptions);

    // console.log(this.y);
    // console.log("hgfhgfc");
    // this.addNewLine();
    this.addText(`${mergedOptions.tableName}`);

    if (mergedOptions.addToIndex) {
      this.indexData.push({
        Index: mergedOptions.tableName,
        Page: this.doc.getCurrentPageInfo().pageNumber,
      });
    }

    const headers = Object.keys(dataArr[0]).filter(
      (key) => !mergedOptions.ignoreFields?.includes(key)
    );

    const transformedData = dataArr.map((item, index) =>
      headers.map((key) =>
        item[key] instanceof Date ? item[key].toISOString() : item[key]
      )
    );

    autoTable.default(this.doc, {
      head: [headers],
      body: transformedData,
      didDrawCell: (data) => {},
      didDrawPage: (data) => {
        addHeader(this.doc);
      },
      ...mergedOptions,
    });
    this.y = this.doc.lastAutoTable.finalY + this.doc.getLineHeight();
    this.updatePointer();
  }

  async addText(text, options) {
    const lines = this.doc.splitTextToSize(
      text,
      this.doc.internal.pageSize.width - this.xMargin * 2
    );

    if (options?.addToIndex) {
      this.indexData.push({
        Index: text,
        Page: this.doc.getCurrentPageInfo().pageNumber,
      });
    }

    // console.log(`posi before writing TEXT '${text}' is ${this.x} & ${this.y}`);
    // console.log("kjkjk\n" + this.doc.getTextDimensions(lines).h + "\njhgyjh");

    this.doc.text(lines, options?.x || this.x, options?.y || this.y);
    this.y += this.doc.getTextDimensions(lines).h + this.doc.getLineHeight();
    this.updatePointer();
  }

  async addNewLine() {
    this.y += this.doc.getLineHeight();
    this.x = this.xMargin;
    this.updatePointer();
  }
  async addHorizontalLine() {
    this.doc.line(
      this.x,
      this.y,
      this.doc.internal.pageSize.width - this.xMargin,
      this.y
    );
    this.y += this.doc.getLineHeight();
    this.x = this.xMargin;
    this.updatePointer();
  }

  async render() {
    await this.addPageNumbers();
    await this.index();
    return new Promise((resolve, reject) => {
      this.doc.save(this.filePath);
      resolve(this.filePath);
    });
  }

  async addPageNumbers() {
    const pageCount = this.doc.internal.getNumberOfPages(); //Total Page Number
    for (let i = 0; i < pageCount; i++) {
      this.doc.setPage(i);
      const pageCurrent = this.doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      this.doc.setFontSize(12);
      this.doc.text(
        "page: " + pageCurrent + "/" + pageCount,
        this.xMargin,
        this.doc.internal.pageSize.height - this.yMargin / 2
      );
    }
  }

  async index() {
    this.doc.setPage(2);
    this.resetXandY();
    this.updatePointer();
    await this.addGenericTable(this.indexData, {
      tableName: `Table of Contents`,
      theme: "grid",
    });
  }
}

module.exports = {
  PdfService,
};
