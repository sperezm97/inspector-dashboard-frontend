import {
    Share,
    Printer,
    FileText,
    File,
    Grid,
  } from 'react-feather'
  import {
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap'

import { downloadCSV } from '../../../utility/Utils'

export const ExportButtons = ({newDataTable}) => {

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline>
                <Share size={15} />
                <span className="align-middle ml-50">Exportar</span>
            </DropdownToggle>
            <DropdownMenu right>
                {/* <DropdownItem className="w-100">
                    <Printer size={15} />
                    <span className="align-middle ml-50">Imprimir</span>
                </DropdownItem> */}
                <DropdownItem
                    className="w-100"
                    onClick={() => downloadCSV(newDataTable)}
                >
                    <FileText size={15} />
                    <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
                {/* <DropdownItem className="w-100">
                    <Grid size={15} />
                    <span className="align-middle ml-50">Excel</span>
                </DropdownItem> */}
                {/* <DropdownItem className="w-100">
                    <File size={15} />
                    <span className="align-middle ml-50">PDF</span>
                </DropdownItem> */}
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    )
}