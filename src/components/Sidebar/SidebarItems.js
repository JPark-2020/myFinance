import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as DiIcons from 'react-icons/di';

export const SidebarItems = [
    {
        title: 'Dashboard',
        path:'/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text',
        key: 'Dashboard' 
    },
    {
        title: 'Banking',
        path:'/banking',
        icon: <AiIcons.AiFillBank/>,
        cName:'nav-text',
        key: 'Banking'
    },
    {
        title: 'Expenses',
        path:'/expenses',
        icon: <FaIcons.FaMoneyBillAlt/>,
        cName:'nav-text',
        key: 'Expenses'
    },
    {
        title: 'Reports',
        path:'#',
        icon: <HiIcons.HiDocumentText/>,
        cName:'nav-text',
        key: 'Reports'
    },
    {
        title: 'Taxes',
        path:'#',
        icon: <HiIcons.HiReceiptTax/>,
        cName:'nav-text',
        key: 'Taxes'
    },
    {
        title: 'Settings',
        path:'#',
        icon: <DiIcons.DiAptana/>,
        cName:'nav-text',
        key: 'Settings'
    }
]

