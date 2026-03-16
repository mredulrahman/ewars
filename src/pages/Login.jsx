import * as React from 'react';
import Button from '@mui/material/Button';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { styled } from '@mui/material/styles';
// import { useNavigate } from 'react-router-dom';
import SidebarSignin from '../components/Sidebar-Signin';


export default function Login() {
  const [open, setOpen] = React.useState(false);

  // const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const AnimatedIcon = styled(ArrowForwardOutlinedIcon)(({ theme }) => ({
    transition: 'transform 0.3s ease-in-out',
    '.MuiButton-root:hover &': {
      transform: 'translateX(8px)',
    }
  }));

  return (
    <>
      <div className='my-18 ml-14'>
        <div className='flex items-center gap-3'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-biohazard h-10 w-10 text-black"><circle cx="12" cy="11.9" r="2"></circle><path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"></path><path d="m8.9 10.1 1.4.8"></path><path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"></path><path d="m15.1 10.1-1.4.8"></path><path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"></path><path d="M12 13.9v1.6"></path><path d="M13.5 5.4c-1-.2-2-.2-3 0"></path><path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5"></path><path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5"></path></svg>
          <span className='space-grotesk-myfont text-2xl font-bold'>EWARS Bangladesh</span>
        </div>
        <div className='mt-12 mb-8'>
          <h1 className='inter-myfont1 text-5xl font-bold mb-4'>Bangladesh EWARS</h1>
          <h2 className='inter-myfont1 text-2xl font-semibold text-gray-600'>Early Warning Alert and Response System</h2>
        </div>
        <p className='inter-myfont1 font-normal text-gray-600 text-lg w-xl '>
          A comprehensive disease surveillance platform for Bangladesh, providing real-time monitoring, predictive analytics, and outbreak simulations. Track disease patterns, analyze trends, and make data-driven public health decisions to protect communities across the nation.
        </p>
        <div className='my-4'>
          <Button
            onClick={toggleDrawer(true)}
            variant='contained'
            endIcon={<AnimatedIcon />}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: '16px',
              fontWeight: '500',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}>
            Go to Dashboard
          </Button>
        </div>
        <div className='flex items-center gap-8'>
          <div className='w-10'>
            <img src="/assets/logo/govt.png" alt="govt logo" className='w-full' />
          </div>
          <div className='w-10'>
            <img src="/assets/logo/dghs.png" alt="dghs logo" />
          </div>
          <div className='w-20'>
            <img src="/assets/logo/groupmappers.png" alt="groupmappers logo" />
          </div>
          <div className='w-18'>
            <img src="/assets/logo/brac.png" alt="brac logo" />
          </div>
          <div className='w-18'>
            <img src="/assets/logo/imacs.png" alt="imacs logo" />
          </div>
          <div className='w-10'>
            <img src="/assets/logo/unops.png" alt="unops logo" />
          </div>
          <div className='w-18'>
            <img src="/assets/logo/moru.png" alt="moru logo" />
          </div>
          <div className='w-10'>
            <img src="/assets/logo/mis.png" alt="mis logo" />
          </div>
          <div className='w-8'>
            <img src="/assets/logo/iedcr.png" alt="iedcr logo" />
          </div>
        </div>
        <div className='w-2xl my-2'>
          <p className='inter-myfont1 font-normal text-gray-600 text-sm'>The EWARS system has been developed with funding support from The Global Fund and Technology provided by IMACS.</p>
          <p className='inter-myfont1 font-normal text-gray-600 text-xs my-1'>© 2025 Bangladesh EWARS. All rights reserved.</p>
        </div>
        <SidebarSignin
          open={open}
          onClose={toggleDrawer(false)} />
      </div>
    </>
  )
}