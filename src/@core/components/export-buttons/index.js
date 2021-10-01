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

export const ExportButtons = () => {

    // const convertArrayOfObjectsToCSV = (array) => {
    //     let result
    
    //     const columnDelimiter = ','
    //     const lineDelimiter = '\n'
    //     const keys = Object.keys(data[0])
    
    //     result = ''
    //     result += keys.join(columnDelimiter)
    //     result += lineDelimiter
    
    //     array.forEach((item) => {
    //         let ctr = 0
    //         keys.forEach((key) => {
    //             if (ctr > 0) result += columnDelimiter
        
    //             result += item[key]
        
    //             ctr++
    //         })
    //         result += lineDelimiter
    //     })
    
    //     return result
    // }

    // const downloadCSV = (array = []) => {
        
    //     if(array === []) return
        
    //     const link = document.createElement('a')
    //     let csv = convertArrayOfObjectsToCSV(array)
    //     if (csv === null) return

    //     const filename = 'export.csv'
    
    //     if (!csv.match(/^data:text\/csv/i)) {
    //       csv = `data:text/csv;charset=utf-8,${csv}`
    //     }
    
    //     link.setAttribute('href', encodeURI(csv))
    //     link.setAttribute('download', filename)
    //     link.click()
    // }

    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline>
                <Share size={15} />
                <span className="align-middle ml-50">Exportar</span>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem className="w-100">
                    <Printer size={15} />
                    <span className="align-middle ml-50">Imprimir</span>
                </DropdownItem>
                <DropdownItem
                    className="w-100"
                    // onClick={() => downloadCSV(data)}
                >
                    <FileText size={15} />
                    <span className="align-middle ml-50">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                    <Grid size={15} />
                    <span className="align-middle ml-50">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                    <File size={15} />
                    <span className="align-middle ml-50">PDF</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    )
}