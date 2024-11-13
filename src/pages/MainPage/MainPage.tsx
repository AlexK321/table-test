import { useState } from 'react';

import { ServerProgress } from '../../components/ServerProgress';
import { TableTest } from '../../components/TableTest';
import { showLogo } from '../../store/reducers/root-reducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { MainContainer } from './MainPage.style';

export const MainPage = () => {
  const [progressValue, setProgressValue] = useState(5);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgressValue(Number(event.target.value));
  };

  return (
    <MainContainer>
      {/* <div>Header</div>
      <div>Content</div> */}
      <TableTest />
      <p>Ячейка прогресса сервера</p>
      <div style={{ maxWidth: '300px', margin: '20px 0' }}>
        <input
          type="range"
          min="0"
          max="100"
          value={progressValue}
          onChange={handleProgressChange}
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ maxWidth: '200px' }}>
        <ServerProgress value={progressValue} isSoundNotification={true} isBlink={true} />
      </div>
      <button
        onClick={() => {
          throw new Error('This is your first error!');
        }}
      >
        Break the world
      </button>
    </MainContainer>
  );
};
