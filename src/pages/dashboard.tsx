import Navbar from "../components/Navbar";
import ToDoList from "../components/ToDoList";
import FormManagement from "../components/FormManagement";
import FileManagement from "../components/FileManagement";
import RFPApplication from "../components/RFPApplication";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

const Dashboard = () => {
  const links = [
    { name: "Task Management", href: "#task-management" },
    { name: "File Management", href: "#file-management" },
    { name: "RFP Application", href: "#rfp-application" },
  ];

  return (
    <div>
      <Navbar
        links={links}
        title="{Organization Name}'s Dashboard"
        color="myblack"
      />
      <div
        id="task-management"
        className="flex justify-around p-8 mt-16 bg-myoffwhite h-auto"
      >
        <ToDoList />
        <FormManagement />
      </div>
      <div
        id="file-management"
        className="flex justify-around p-8 bg-mylightblue"
      >
        <FileManagement />
      </div>
      <div id="rfp-application" className="flex p-8 bg-mybrown">
        <RFPApplication />
      </div>
      <div id="chatbot" className="flex p-8 bg-mydarkblue">
        <Chatbot />
      </div>
      <div id="footer" className="flex p-8 bg-mydarkblue">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
