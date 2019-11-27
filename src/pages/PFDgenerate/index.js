// import React, { Component } from 'react'
// import { Page, Text, View, Document, StyleSheet,PDFViewer  } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'row',
//         backgroundColor: '#E4E4E4'
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// const MyDocument = () => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Section #1</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>Section #2</Text>
//             </View>
//         </Page>
//     </Document>
// )
// class PDFgenerate extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }
   

//     closeStatusHandle = () => {
//         //  console.log(this.props)
//         this.props.history.replace("/userhome");
//     }
//     render() {
//         return (
//             <>
//                 <PDFViewer>
//                     <MyDocument />
//                 </PDFViewer>
//                 <div style={{ height: '40px', padding: '5px', width: 'fit-content' }} onClick={this.closeStatusHandle}>
//                     <i className="fas fa-caret-left" style={{ float: 'left', margin: '0px 0px 0px 5px', fontSize: '23px' }} />
//                     <p style={{ width: 'fit-content', margin: '1px', float: 'left', fontSize: '15px' }}>Back</p>
//                 </div>

//                 <div className='d-flex flex-column rounded'>
//                     <div className='p-2 rounded w-100  px-3'>
//                         <div class="form-group w-100 mb-0">
//                             <label for="exampleInputEmail1">Expendature Name</label>
//                             <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//                         </div>
//                     </div>
//                     <div className='p-2  rounded w-100 px-3'>
//                         <div class="form-group w-100 mb-0">
//                             <label for="exampleInputEmail1">Price</label>
//                             <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
//                         </div>
//                     </div>

//                 </div>
//             </>
//         )
//     }
// }

// export default PDFgenerate;