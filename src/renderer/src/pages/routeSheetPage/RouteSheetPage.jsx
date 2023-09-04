import React, { useState } from 'react';
import cn from 'classnames';
import { SupplierList, RouteSheet, Sidebar } from '../../components';
import { SupplierTab } from '../../components/supplierTab';
import './RouteSheetPage.css';
// import { useServer } from "../../hooks";

export function RouteSheetPage() {
  // const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <div className='route-sheet-page'>
      {/* <Sidebar
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
        logout={logout}
      /> */}
      <div className={cn('content-container content-container--left')}>
        <SupplierList />
        <SupplierTab />
      </div>
      <div className='content-container content-container--right'>
        <RouteSheet />
      </div>
    </div>
  );
}
