import React from 'react';
import { Grid } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center">
      <Grid
        visible={true}
        height="80"
        width="80"
        radius={12.5}
        ariaLabel="grid-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        color={'#7A59BD'}
      />
    </div>
  );
}

export default Loader;
