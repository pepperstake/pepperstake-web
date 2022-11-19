import { Divider, Steps } from 'antd';
import React from 'react';

const PepperSteps: React.FC<{step:number, setStep: (value: number) => void}> = ({step, setStep}) => (
  <>
    <Steps
      className='flex justify-center  font-mono'
      progressDot
      current={step}
      onChange={(c) => {setStep(c)}}
      items={[
        {
          title: 'Project Details',
        },
        {
          title: 'Stake Amount',
        },
        {
          title: 'Set Duration',
        },
        {
          title: 'Add Supervisor(s)',
        },
        {
           title: 'Set Unreturned Stake Beneficiaries',
        },
        {
          title: 'MISC',
       },
 
      ]}
    />
   
  </>
);

export default PepperSteps;