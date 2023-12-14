import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as SiIcons from 'react-icons/si';
import * as VscIcons from 'react-icons/vsc';
import './AdminMain.css';
import Admin from './Admin';
import AddStories from './AddStories';
import Customers from './Customers';
import City from './City';
import DomesticCity from './DomesticCity';
import Countries from './Countries';
import Tours from './Tours';
import State from './State';
import Blogpage from './Blogpage';
import Testimonialspage from './Testimonialspage';
import Adminusers from './Adminusers';
import Promotion from './Promotion';
import GaiaSuggestions from './GaiaSuggestions';
import Particulars from './Particulars';
import PaymentType from './PaymentType';
import Vendor from './Vendor';
import EmployeePhoto from './EmployeePhoto';
import DummySlot from './DummySlot';

const AdminSidebarData = [
  {
    title: 'Dashboard',
    step: 1,
    icon: <AiIcons.AiFillDashboard />,
  },
  {
    title: 'Story',
    step: 2,
    icon: <AiIcons.AiFillDashboard />,
  },

  {
    title: 'Customers',
    step: 3,
    icon: <AiIcons.AiFillDashboard />,
  },
  {
    title: 'City',
    step: 4,
    icon: <SiIcons.SiGoogletagmanager />,
  },
  {
    title: 'Domestic Cities',
    step: 5,
    icon: <SiIcons.SiGoogletagmanager />,
  },
  {
    title: 'Country',
    step: 6,
    icon: <VscIcons.VscPackage />,
  },
  {
    title: 'Tours',
    step: 7,
    icon: <VscIcons.VscPackage />,
  },
  {
    title: 'State',
    step: 8,
    icon: <VscIcons.VscPackage />,
  },
  {
    title: 'Blogs',
    step: 9,
    icon: <FaIcons.FaBlogger />,
  },
  {
    title: 'Testimonials',
    step: 10,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Users',
    step: 11,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Promotion',
    step: 12,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Gaia Suggestions',
    step: 13,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Particulars',
    step: 14,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Payment Type',
    step: 15,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Vendors',
    step: 16,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Employee Photo',
    step: 17,
    icon: <AiIcons.AiOutlineTag />,
  },
  {
    title: 'Dummy Slot',
    step: 18,
    icon: <AiIcons.AiOutlineTag />,
  },
];

const AdminMain = () => {
  const [step, setStep] = useState(1);

  const renderAdminPages = () => {
    switch (step) {
      case 1:
        return <Admin />;
      case 2:
        return <AddStories />;
      case 3:
        return <Customers />;
      case 4:
        return <City />;
      case 5:
        return <DomesticCity />;
      case 6:
        return <Countries />;
      case 7:
        return <Tours />;
      case 8:
        return <State />;
      case 9:
        return <Blogpage />;
      case 10:
        return <Testimonialspage />;
      case 11:
        return <Adminusers />;
      case 12:
        return <Promotion />;
      case 13:
        return <GaiaSuggestions />;
      case 14:
        return <Particulars />;
      case 15:
        return <PaymentType />;
      case 16:
        return <Vendor />;
      case 17:
        return <EmployeePhoto />;
      case 18:
        return <DummySlot />;
      default:
        return step;
    }
  };

  return (
    <div className='salessadminmainnn'>
      <div className='salessadminmainndivide1n'>
        <ul className='salessadminmainndivide1Uln'>
          {AdminSidebarData.map((a) => {
            return (
              <li
                className={
                  step == a.step
                    ? 'salessadminmainndivide1Lin'
                    : 'salessadminmainndivide1LiNn'
                }
                onClick={() => setStep(a.step)}>
                <div className='salessadminmainndivide1LinI'>{a.icon}</div>
                {a.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='salessadminmainndivide2n'>{renderAdminPages()}</div>
    </div>
  );
};

export default AdminMain;
