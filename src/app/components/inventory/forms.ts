import { Component } from "@angular/core";
import {  MatDialogContent } from "@angular/material/dialog";


@Component({
    selector: 'forms',
    templateUrl: 'forms.html',
    styleUrl:"forms.css",
    imports: [MatDialogContent],
   
})

export class forms{

 // This function is called when the Print button is clicked
 takepring(printContent: HTMLElement): void {
    const printWindow = window.open('', '', 'height=600,width=800');
    
    // Inject styles and HTML content into the print window
    printWindow?.document.write('<html><head><title>Print Form</title>');
    printWindow?.document.write('<style>body { font-family: Arial, sans-serif; padding: 20px; }</style>');
    printWindow?.document.write(`
        <style>
          /* General Styles */
          .mat-mdc-dialog-content {
            display: block;
            flex-grow: 1;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            overflow: visible;
            max-height: none;
          }

          /* Additional styles here... */
          .center { text-align: center; }
          .rows { display: flex; justify-content: center; align-items: center; margin-top: 02px; }
          h1, h2 { margin: 10px 0; font-weight: bold; }
          h1 b { font-weight: bold; }
          .title { color: #2C3E50; font-size: 2.5em; margin-bottom: 20px; }
          .company-name { color: #1abc9c; margin-left: 20px; }
          .address { color: #555; margin-left: 20px; font-size: 1.1em; font-style: italic; }
          table { width: 100%; margin-top: 20px; border-collapse: collapse; }
          th, td { padding: 12px 18px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #2980b9; color: white; }
          .section-title { font-size: 1.2em; color: #2980b9; text-decoration: underline; }
          .signature-section { display: flex; justify-content: space-between; margin-top: 5px; }
        </style>
    `);
    printWindow?.document.write('</head><body>');
    
    // Inject the content to print
    printWindow?.document.write(printContent.innerHTML);
    printWindow?.document.write('</body></html>');
    
    // Close the document and wait before printing to ensure everything is loaded
    printWindow?.document.close();

    // Wait for the content to render, then trigger the print
    setTimeout(() => {
      printWindow?.print();
      printWindow?.close();  // Optionally close the print window after printing
    }, 500); // Adjust the delay if needed (500ms should be sufficient)
  }
}