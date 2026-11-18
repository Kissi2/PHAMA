import { Composition } from 'remotion';
import { DashboardLoop, DURATION, FPS, HEIGHT, WIDTH } from './DashboardLoop';

export const RemotionRoot = () => (
  <Composition id="DashboardLoop" component={DashboardLoop} durationInFrames={DURATION} fps={FPS} width={WIDTH} height={HEIGHT} />
);
