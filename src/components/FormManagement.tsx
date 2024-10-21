import Form from "./Form";
import "../index.css";

const FormManagement = () => {
  return (
    <div className="bg-myblack p-6 rounded-lg w-1/2 h-full">
      <h2 className="font-[Montserrat] font-bold text-2xl text-myoffwhite mb-4">
        Form Management
      </h2>
      <ul className="space-y-2 max-h-64 overflow-auto scrollbar-hide">
        <Form title="Drug-Free Workplace" link="#form-1" />
        <Form
          title="Confidential/Proprietary Submittals"
          link="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.azed.gov%2Fsites%2Fdefault%2Ffiles%2Fmedia%2FBPM005443%2520Attachment%2520Documents.docx&wdOrigin=BROWSELINK"
        />
        <Form title="Deviations and Exceptions (if any)" link="#form-2" />
        <Form title="Addendum Acknowledgement (if any)" link="#form-2" />
        <Form title="Non-Collusion" link="#form-2" />
        <Form title="Offer & Acceptance" link="#form-2" />
        <Form title="W-9" link="#form-2" />
        {/* Add more forms as needed */}
      </ul>
    </div>
  );
};

export default FormManagement;
