import { ArrowRight } from "lucide-react";

interface FormProps {
  title: string;
  link: string;
}

const Form: React.FC<FormProps> = ({ title, link }) => {
  return (
    <li>
      <a
        href={link}
        className="bg-mymint p-2 rounded flex justify-between items-center font-[Outfit] text-myblack no-underline group"
      >
        <span>{title}</span>
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </li>
  );
};

export default Form;
