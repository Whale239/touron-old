import React, { useState, useEffect, useContext, useRef } from 'react';
import { firedb, fireStorage } from '../firebase';
import './BookingRecord.css';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import {
  AiFillEdit,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Input, Modal, Spinner } from 'reactstrap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useToasts } from 'react-toast-notifications';
import numeral from 'numeral';
import { ApiContext } from './../Context/ApiContext';
import JoditEditor from 'jodit-react';
// import ReactExport from 'react-export-excel';

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const BookingRecord = () => {
  const isMounted = useRef(false);
  const isPayment = useRef(false);
  const isNotify = useRef(false);
  const invoiceHtml = useRef(null);
  const billto = useRef(null);
  const invoiceDes = useRef(null);
  const [invoiceTypeView, setInvoiceTypeView] = useState(false);
  const [invoicePreviewView, setInvoicePreviewView] = useState(false);
  const [paymentsId, setPaymentsId] = useState('');
  const [paymentModifyView, setPaymentModifyView] = useState(false);
  const [paymentSingleModifyView, setPaymentSingleModifyView] = useState(false);
  const [expensesModifyView, setExpensesModifyView] = useState(false);
  const [paymentRecieved, setPaymentRecieved] = useState(false);
  const [expensesChecked, setExpensesChecked] = useState(false);
  const { surveyid } = useParams();
  const [surveyId, setSurveyId] = useState('');
  const [travellerDocuments, setTravellerDocuments] = useState([]);
  const [childrenDocuments, setChildrenDocuments] = useState([]);
  const { addToast } = useToasts();
  const { employees } = useContext(ApiContext);
  const [deleteId, setDeleteId] = useState('');
  const [editpaymentId, setEditpaymentId] = useState('');
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(true);
  const [visaEdit, setVisaEdit] = useState(true);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [updatePaymentOpen, setUpdatePaymentOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);
  const [internationalModal, setInternationalModal] = useState(false);
  const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [showParti, setShowParti] = useState(false);
  const [showRecvType, setShowRecvType] = useState(false);
  const [showGenVendor, setShowGenVendor] = useState(false);
  const [showGenVisaOnArrival, setShowGenVisaOnArrival] = useState(false);
  const [showGenSales, setShowGenSales] = useState(false);
  const [showGenBook, setShowGenBook] = useState(false);
  const [showVisaStat, setShowVisaStat] = useState(false);
  const [showVisaVendor, setShowVisaVendor] = useState(false);
  const [showVisaApmt, setShowVisaApmt] = useState(false);
  const [showTcs, setShowTcs] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showRemindTime, setShowRemindTime] = useState(false);
  const [payParticulars, setPayParticulars] = useState('');
  const [recvType, setRecvType] = useState('');
  const [genVendorName, setGenVendorName] = useState('');
  // const [uploading, setUploading] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [uploading1, setUploading1] = useState(false);
  const [progress1, setProgress1] = useState(0);
  const [uploading2, setUploading2] = useState(false);
  const [progress2, setProgress2] = useState(0);
  const [uploading3, setUploading3] = useState(false);
  const [progress3, setProgress3] = useState(0);
  const [uploading4, setUploading4] = useState(false);
  const [progress4, setProgress4] = useState(0);
  const [uploading5, setUploading5] = useState(false);
  const [progress5, setProgress5] = useState(0);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [visa, setVisa] = useState([]);
  const [tourReports, setTourReports] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [docId, setDocId] = useState('');
  const [flightPdfs, setFlightsPdfs] = useState([]);
  const [hotelPdfs, setHotelPdfs] = useState([]);
  const [visaPdfs, setVisaPdfs] = useState([]);
  const [tourReportsPdfs, setTourReportsPdfs] = useState([]);
  const [vouchersPdfs, setVouchersPdfs] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: '',
    invoiceDate: '',
    dueDate: '',
    invoiceDatas: [],
  });
  const [billTo, setBillTo] = useState('');
  const [invcDes, setInvsDes] = useState('');
  const [invoiceSingleData, setInvoiceSingleData] = useState({
    qty: '',
    unitPrice: '',
    cgst: '',
    sgst: '',
  });

  const { invoiceNo, invoiceDate, dueDate, invoiceDatas } = invoiceData;
  const { qty, unitPrice, cgst, sgst } = invoiceSingleData;

  const [notifyss, setNotifyss] = useState([]);

  console.log('notifyss', notifyss);

  // console.log('invoiceData', invoiceData);
  // console.log('invoiceSingleData', invoiceSingleData);
  // console.log('paymentSucceed', paymentSucceed);

  // console.log('hotels', hotels);

  // console.log('uploading', uploading);

  // console.log(`travellerDocuments`, travellerDocuments);
  // console.log(`childrenDocuments`, childrenDocuments);

  const getDocuments = (email, destination, onwardDate) => {
    firedb
      .ref(`onBoard`)
      .orderByChild('email')
      .equalTo(email)
      .on('value', (data) => {
        if (!data) {
          console.log('no data');
          setTravellerDocuments([]);
          setChildrenDocuments([]);
        } else {
          // console.log(`data.val()`, data.val());
          data.forEach((d) => {
            if (
              d.val().destination === destination &&
              d.val().onwardDate === onwardDate
            ) {
              setTravellerDocuments(d.val().travellers);
              setChildrenDocuments(d.val().childrens);
            }
          });
        }
      });
  };

  function openInternationalModal() {
    setInternationalModal(true);
  }
  function closeInternationalModal() {
    setInternationalModal(false);
  }
  function openDeletePaymentModal() {
    setShowDeletePaymentModal(true);
  }
  function closeDeletePaymentModal() {
    setShowDeletePaymentModal(false);
  }

  const [newPayment, setNewPayment] = useState({
    id: uuidv4(),
    date: '',
    particulars: '',
    recievedType: '',
    recievedAmount: 0,
    spentAmount: 0,
    remark: '',
    pv: false,
  });

  const time = [
    {
      name: '08.00 AM',
      value: 8,
    },
    {
      name: '09.00 AM',
      value: 9,
    },
    {
      name: '10.00 AM',
      value: 10,
    },
    {
      name: '11.00 AM',
      value: 11,
    },
    {
      name: '12.00 PM',
      value: 12,
    },
    {
      name: '01.00 PM',
      value: 13,
    },
    {
      name: '02.00 PM',
      value: 14,
    },
    {
      name: '03.00 PM',
      value: 15,
    },
    {
      name: '04.00 PM',
      value: 16,
    },
    {
      name: '05.00 PM',
      value: 17,
    },
    {
      name: '06.00 PM',
      value: 18,
    },
    {
      name: '07.00 PM',
      value: 19,
    },
    {
      name: '08.00 PM',
      value: 20,
    },
    {
      name: '09.00 PM',
      value: 21,
    },
    {
      name: '10.00 PM',
      value: 22,
    },
    {
      name: '11.00 PM',
      value: 23,
    },
    {
      name: '12.00 AM',
      value: 24,
    },
  ];

  const getTime = (s) => {
    let ti = '';
    time.filter((t) => {
      if (t.value === parseInt(s)) {
        ti = t.name;
      }
    });
    return ti;
  };
  const [newReminder, setNewReminder] = useState({
    id: uuidv4(),
    reminderDate: '',
    title: '',
    body: '',
    isPending: true,
  });

  const { reminderDate, reminderTime, title, body } = newReminder;
  const {
    date,
    particulars,
    recievedType,
    recievedAmount,
    spentAmount,
    remark,
    pv,
  } = newPayment;
  const [general, setGeneral] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    bookedDate: '',
    salesHandleName: '',
    bookingHandleName: '',
    bookingValue: '',
    destination: '',
    totalTravelDays: '',
    paymentDueDate: '',
    adults: 0,
    children: 0,
    vendorName: '',
    onwardDate: '',
    returnDate: '',
    bookingRemarks: '',
    isBookingCancelled: false,
    cancelBookingRemarks: '',
    tcs: '',
    tourType: '',
    panNumber: '',
    finalMargin: '',
  });

  const {
    customerName,
    phoneNumber,
    tourType,
    panNumber,
    email,
    bookedDate,
    salesHandleName,
    bookingHandleName,
    bookingValue,
    destination,
    totalTravelDays,
    paymentDueDate,
    tcs,
    adults,
    children,
    vendorName,
    onwardDate,
    returnDate,
    isBookingCancelled,
    cancelBookingRemarks,
    bookingRemarks,
    finalMargin,
  } = general;

  const [paymentDetails, setPaymentDetails] = useState({
    invoiceNumber: '',
    totalAmount: 0,
    amountDetails: '',
  });

  const { invoiceNumber, totalAmount, amountDetails } = paymentDetails;

  const [visaDetails, setVisaDetails] = useState({
    visaOnArrival: '',
    processingDate: '',
    completedDate: '',
    visaStatus: '',
    visaVendor: '',
    visaValidityDate: '',
    visaAppointmentDate: '',
    visaAppointment: '',
  });

  const {
    visaOnArrival,
    processingDate,
    completedDate,
    visaStatus,
    visaVendor,
    visaValidityDate,
    visaAppointmentDate,
    visaAppointment,
  } = visaDetails;

  const calculatePayment = () => {
    let totalAmountReceived = 0;
    let totalSpentAmount = 0;
    let tcsValue = 0;
    let gst = 0;
    let marginBeforeGst = 0;
    let finalMargin = 0;

    amountDetails.forEach(
      (a) => (totalAmountReceived += parseInt(a.recievedAmount))
    );
    amountDetails.forEach((a) => (totalSpentAmount += parseInt(a.spentAmount)));
    if (general.tcs === 'Yes') {
      tcsValue = (parseInt(bookingValue) * 5) / 100;
      console.log(`tcsValue`, tcsValue);
    }
    marginBeforeGst = totalAmountReceived - totalSpentAmount;

    gst = (marginBeforeGst * 5) / 105;
    finalMargin = marginBeforeGst - gst;

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }
    return [
      totalAmountReceived,
      totalSpentAmount,
      tcsValue,
      round(gst, 1),
      marginBeforeGst,
      round(finalMargin, 1),
    ];
  };

  // const exportData = () => {
  //   let totalAmountReceived = 0;
  //   let totalSpentAmount = 0;
  //   let tcsValue = 0;
  //   let gst = 0;
  //   let marginBeforeGst = 0;
  //   let finalMargin = 0;

  //   if (amountDetails) {
  //     amountDetails.forEach(
  //       (a) => (totalAmountReceived += parseInt(a.recievedAmount))
  //     );
  //   }
  //   if (amountDetails) {
  //     amountDetails.forEach(
  //       (a) => (totalSpentAmount += parseInt(a.spentAmount))
  //     );
  //   }
  //   if (general.tcs === 'Yes') {
  //     tcsValue = (parseInt(bookingValue) * 5) / 100;
  //     console.log(`tcsValue`, tcsValue);
  //   }
  //   marginBeforeGst = totalAmountReceived - totalSpentAmount;

  //   gst = (marginBeforeGst * 5) / 105;
  //   finalMargin = marginBeforeGst - gst;

  //   function round(value, precision) {
  //     var multiplier = Math.pow(10, precision || 0);
  //     return Math.round(value * multiplier) / multiplier;
  //   }

  //   if (amountDetails) {
  //     let ddd = amountDetails.map((obj, i) => ({
  //       ...obj,
  //       totalbookingValue: i === 0 ? numeral(bookingValue).format('0,') : '',
  //       totalAmountReceived:
  //         i === 0 ? numeral(totalAmountReceived).format('0,') : '',
  //       BookingVendorPayment:
  //         i === 0 ? numeral(totalSpentAmount).format('0,') : '',
  //       marginBeforeGst: i === 0 ? numeral(marginBeforeGst).format('0,') : '',
  //       gst: i === 0 ? numeral(gst).format('0,') : '',
  //       finalMargin: i === 0 ? numeral(finalMargin).format('0,') : '',
  //       tcsValue: i === 0 ? numeral(tcsValue).format('0,') : '',
  //     }));
  //     return ddd;
  //   }
  // };

  // console.log('exportData', exportData());

  const [reminders, setReminders] = useState('');

  const setReminder = (newReminder, reminder) => {
    var datess = moment(newReminder.reminderDate).set({
      hour: parseInt(newReminder.reminderTime),
      minute: 0,
      seconds: 0,
    });
    var dates = moment();
    let diff = datess - dates;
    setTimeout(() => {
      let newRemind = reminder.map((r) => {
        if (r.id === newReminder.id) {
          r.isStarted = true;
        }
        return r;
      });

      firedb
        .ref(`bookingdetails1/${surveyid}/reminders`)
        .set(newRemind)
        .then(() => {
          addToast(' Successfully', {
            appearance: 'success',
          });
          setNewReminder({
            id: '',
            reminderDate: '',
            title: '',
            body: '',
            reminderTime: 0,
            isCompleted: false,
            isStarted: false,
          });
        })
        .catch((err) => console.log(`err`, err));
    }, diff);
  };

  const setNotifyssComplete = (key, pending) => {
    try {
      const databaseRef = firedb.ref(`alert/${key}`);
      databaseRef
        .update({
          isPending: !pending,
        })
        .then(() => {
          addToast('Status updated', {
            appearance: 'success',
          });
        });
    } catch (error) {
      console.log(error);
    }
    // firedb
    //   .ref(`alert/${key}`)
    //   .update({
    //     isPending: !pending,
    //   })
    //   .then(() => {
    //     addToast('Status updated', {
    //       appearance: 'success',
    //     });
    //     setStep(1);
    //   })
    //   .catch((err) => console.log(`err`, err));
  };

  const setReminderComplete = (reminder) => {
    let newRemind = reminders.map((r) => {
      if (r.id === reminder.id) {
        r.isCompleted = !r.isCompleted;
      }
      return r;
    });

    firedb
      .ref(`bookingdetails1/${surveyid}/reminders`)
      .set(newRemind)
      .then(() => {
        addToast('Status updated', {
          appearance: 'success',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const updatePaymentDetails = () => {
    if (
      date === '' ||
      recievedType === '' ||
      recievedAmount === '' ||
      spentAmount === '' ||
      particulars === ''
    ) {
      return alert('All fields are required');
    }
    let newPayment = amountDetails.map((a) => {
      if (a.id === editpaymentId) {
        a.id = editpaymentId;
        a.date = date;
        a.particulars = particulars;
        a.recievedType = recievedType;
        a.recievedAmount = recievedAmount;
        a.spentAmount = spentAmount;
        a.remark = remark;
        a.pv = pv ? true : false;
      }
      return a;
    });
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: newPayment,
      })
      .then(() => {
        addToast('Payment updated Successfully', {
          appearance: 'success',
        });
        setNewPayment({
          date: '',
          particulars: '',
          recievedType: '',
          recievedAmount: 0,
          spentAmount: 0,
          remark: '',
          pv: false,
          id: uuidv4(),
        });
        setUpdatePaymentOpen(false);
        setEditpaymentId('');
      })
      .catch((err) => console.log(`err`, err));
  };

  const deletePaymentDetails = (id) => {
    let deletePayment = amountDetails.filter((a) => a.id !== id);
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: deletePayment,
      })
      .then(() => {
        addToast('Payment Deleted Successfully', {
          appearance: 'error',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  const submitBookingDetails = (e) => {
    console.log(`phoneNumber`, phoneNumber);
    e.preventDefault();
    if (surveyId === '') {
      return alert('SurveyId required');
    }
    const bookingDetails = {
      surveyId: surveyId,
      general: {
        customerName: customerName,
        phoneNumber: phoneNumber,
        isBookingCancelled: isBookingCancelled,
        bookingRemarks: bookingRemarks,
        cancelBookingRemarks: cancelBookingRemarks,
        email: email,
        bookedDate: bookedDate,
        salesHandleName: salesHandleName,
        bookingHandleName: bookingHandleName,
        bookingValue: bookingValue,
        destination: destination,
        totalTravelDays: totalTravelDays,
        paymentDueDate: paymentDueDate,
        adults: adults,
        children: children,
        vendorName: vendorName,
        onwardDate: onwardDate,
        returnDate: returnDate,
        tcs: tcs,
        tourType: tourType,
        panNumber: panNumber,
        finalMargin: finalMargin,
      },
      paymentDetails: {
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: amountDetails,
      },
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
      reminders: reminders,
    };
    firedb
      .ref(`bookingdetails1`)
      .push(bookingDetails)
      .then(() => {
        addToast('Added Successfully', {
          appearance: 'success',
        });
        setEdit(false);
        setIsNewRecord(true);
      })
      .catch((err) => console.log(`err`, err));
  };

  const addPaymentDetails = () => {
    if (
      date === '' ||
      recievedType === '' ||
      recievedAmount === '' ||
      spentAmount === '' ||
      particulars === ''
    ) {
      return alert('All fields are required');
    }
    let payment = [];
    if (amountDetails) {
      payment = [...amountDetails, newPayment];
    } else {
      payment = [newPayment];
    }

    console.log('surveyid', surveyid);
    console.log(`payment`, payment);
    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: payment,
      })
      .then(() => {
        addToast('Payment added Successfully', {
          appearance: 'success',
        });
        setPaymentOpen(false);
        setNewPayment({
          date: '',
          particulars: '',
          recievedType: '',
          recievedAmount: 0,
          spentAmount: 0,
          remark: '',
          pv: false,
          id: uuidv4(),
        });
      })

      .catch((err) => console.log(`err`, err));
  };

  const addReminders = () => {
    if (reminderDate === '' || title === '' || body === '') {
      return alert('All fields are required');
    } else {
      firedb
        .ref('alert')
        .push({
          destination: destination,
          email: email,
          onwardDate: onwardDate,
          ...newReminder,
        })
        .then(() => {
          setReminderOpen(false);
          addToast('Reminder added Successfully', {
            appearance: 'success',
          });
          setNewReminder({
            id: uuidv4(),
            reminderDate: '',
            title: '',
            body: '',
            isPending: true,
          });
        })
        .catch((err) => console.log(`err`, err));
    }
    // if (
    //   reminderDate === '' ||
    //   title === '' ||
    //   body === '' ||
    //   reminderTime <= 0
    // ) {
    //   return alert('All fields are required');
    // }
    // let reminder = [];
    // if (reminders) {
    //   reminder = [...reminders, newReminder];
    // } else {
    //   reminder = [newReminder];
    // }
    // firedb
    //   .ref(`bookingdetails1/${surveyid}/reminders`)
    //   .set(reminder)
    //   .then(() => {
    //     setReminderOpen(false);
    //     addToast('Reminder added Successfully', {
    //       appearance: 'success',
    //     });
    //     setReminder(newReminder, reminder);
    //     setNewReminder({
    //       id: '',
    //       reminderDate: '',
    //       title: '',
    //       body: '',
    //       reminderTime: 0,
    //       isStarted: false,
    //       isCompleted: false,
    //     });
    //   })
    //   .catch((err) => console.log(`err`, err));
  };

  const updateBookingDetails = () => {
    console.log(`phoneNumber`, phoneNumber);

    const bookingDetails = {
      surveyId: surveyId,
      general: {
        customerName: customerName,
        phoneNumber: phoneNumber,
        tcs: tcs,
        tourType: tourType,
        panNumber: panNumber,
        email: email,
        bookedDate: bookedDate,
        salesHandleName: salesHandleName,
        bookingHandleName: bookingHandleName,
        bookingValue: bookingValue,
        destination: destination,
        totalTravelDays: totalTravelDays,
        paymentDueDate: paymentDueDate,
        adults: adults,
        children: children,
        vendorName: vendorName,
        onwardDate: onwardDate,
        returnDate: returnDate,
        isBookingCancelled: isBookingCancelled,
        cancelBookingRemarks: cancelBookingRemarks,
        bookingRemarks: bookingRemarks,
        finalMargin: finalMargin,
      },
      paymentDetails: {
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: amountDetails,
      },
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
      reminders: reminders,
    };
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .update(bookingDetails)
      .then(() => {
        addToast('Updated Successfully', {
          appearance: 'success',
        });
        setEdit(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  const cancelBookingdetails = () => {
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .child('general')
      .update({
        isBookingCancelled: isBookingCancelled,
        cancelBookingRemarks: cancelBookingRemarks,
      })
      .then(() => {
        addToast('Booking cancelled Successfully', {
          appearance: 'success',
        });
        setGeneral({
          ...general,
          isBookingCancelled: false,
          cancelBookingRemarks: '',
        });
      })
      .catch((err) => console.log(`err`, err));
  };

  // const deleteBookingDetails = () => {
  //   firedb
  //     .ref(`bookingDetails/${surveyId}`)
  //     .set()
  //     .then(() => console.log(`sucess`))
  //     .catch((err) => console.log(`err`, err));
  // };

  const submitVisaDetails = () => {
    const bookingDetails = {
      visaDetails: {
        visaOnArrival: visaOnArrival,
        processingDate: processingDate,
        completedDate: completedDate,
        visaStatus: visaStatus,
        visaVendor: visaVendor,
        visaValidityDate: visaValidityDate,
        visaAppointmentDate: visaAppointmentDate,
        visaAppointment: visaAppointment,
      },
    };
    firedb
      .ref(`bookingdetails1/${surveyid}`)
      .update(bookingDetails)
      .then(() => {
        addToast('Visa added Successfully', {
          appearance: 'success',
        });
        setVisaEdit(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  useEffect(() => {
    if (surveyid) {
      const getBookingDetails = () => {
        setEdit(false);
        setVisaEdit(false);
        setDetailsLoaded(true);
        setIsNewRecord(true);
        firedb.ref(`bookingdetails1/${surveyid}`).on('value', (data) => {
          const { general, paymentDetails, visaDetails, surveyId, reminders } =
            data.val();

          getDocuments(general.email, general.destination, general.onwardDate);
          setSurveyId(surveyId);
          setGeneral({
            tourType: general.tourType,
            panNumber: general.panNumber,
            tcs: general.tcs,
            customerName: general.customerName,
            phoneNumber: general.phoneNumber,
            email: general.email,
            bookedDate: general.bookedDate,
            salesHandleName: general.salesHandleName,
            bookingHandleName: general.bookingHandleName,
            bookingValue: general.bookingValue,
            destination: general.destination,
            totalTravelDays: general.totalTravelDays,
            paymentDueDate: general.paymentDueDate,
            adults: general.adults,
            children: general.children,
            vendorName: general.vendorName,
            onwardDate: general.onwardDate,
            returnDate: general.returnDate,
            isBookingCancelled: general.isBookingCancelled,
            bookingRemarks: general.bookingRemarks,
            cancelBookingRemarks: general.cancelBookingRemarks,
            finalMargin: general.finalMargin,
          });
          if (Object.keys(paymentDetails).includes('amountDetails')) {
            setPaymentDetails({
              invoiceNumber: paymentDetails.invoiceNumber,
              totalAmount: paymentDetails.totalAmount,
              amountDetails: paymentDetails.amountDetails,
            });
          } else {
            setPaymentDetails({
              invoiceNumber: paymentDetails.invoiceNumber,
              totalAmount: paymentDetails.totalAmount,
              amountDetails: [],
            });
          }

          setVisaDetails({
            visaOnArrival: visaDetails.visaOnArrival,
            processingDate: visaDetails.processingDate,
            completedDate: visaDetails.completedDate,
            visaStatus: visaDetails.visaStatus,
            visaVendor: visaDetails.visaVendor,
            visaValidityDate: visaDetails.visaValidityDate,
            visaAppointmentDate: visaDetails.visaAppointmentDate,
            visaAppointment: visaDetails.visaAppointment,
          });
          if (reminders) {
            setReminders(reminders);
          }
          //     }
          //   });
          // }
        });
        setDetailsLoaded(false);
      };
      getBookingDetails();
    }
  }, [surveyid]);

  // const generalHandle = (e) => {
  //   const { name, value } = e.target;
  //   setGeneral({
  //     ...general,
  //     [name]: value,
  //   });
  // };

  // const payParticulars = [
  //   'Payment Recieved',
  //   'Hotel Payment',
  //   'Flight Payment',
  //   'Taxi Payment',
  //   'Special Benefits',
  //   'Visa',
  //   'Refund',
  //   'Tours Booking',
  //   'Bike Payment',
  //   'TCS-Taxes',
  //   'Vendor Payments',
  //   'Insurance',
  //   'Train Tickets',
  //   'Resort Payment',
  // ];

  // const RecvType = [
  //   'SBI CU',
  //   'IDFC Cu',
  //   'SBI Card',
  //   'AMEX Card',
  //   'HDFC Card',
  //   'Wallets',
  // ];

  // const GenVendorName = [
  //   'One Above',
  //   'TBO Group',
  //   'Aueraga Global',
  //   'KLOOK',
  //   'Viator',
  //   'Delhi Tamil Cars',
  //   'Tripmore Travels',
  //   'GoCabs',
  //   'M.K Travels Goa',
  // ];

  const payParticularss = () => {
    let p = [];
    firedb.ref('particularDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setPayParticulars(p);
    });
  };
  const paymentTypes = () => {
    let p = [];
    firedb.ref('paymentTypeDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setRecvType(p);
    });
  };
  const vendors = () => {
    let p = [];
    firedb.ref('vendorDetail').on('value', (data) => {
      data.forEach((d) => {
        p.push(d.val().name);
      });
      setGenVendorName(p);
    });
  };

  useEffect(() => {
    payParticularss();
    paymentTypes();
    vendors();
  }, []);

  const chooseFlight = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const filess = e.target.files[i];
      setFlightsPdfs((prevState) => [...prevState, filess]);
    }
  };
  const chooseHotel = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const filess = e.target.files[i];
      setHotelPdfs((prevState) => [...prevState, filess]);
    }
  };
  const chooseVisa = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const filess = e.target.files[i];
      setVisaPdfs((prevState) => [...prevState, filess]);
    }
  };
  const chooseTourReport = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const filess = e.target.files[i];
      setTourReportsPdfs((prevState) => [...prevState, filess]);
    }
  };
  const chooseVoucher = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const filess = e.target.files[i];
      setVouchersPdfs((prevState) => [...prevState, filess]);
    }
  };

  const uploadFlight = () => {
    flightPdfs.map((file) => {
      setUploading1(true);
      const ref = fireStorage.ref(`onBoard/${file.name}`);
      const task = ref.put(file);
      task.on('state_changed', (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setProgress1(Math.round(per));
      });
      task.then(() => {
        ref.getDownloadURL().then((url) => {
          setProgress1(0);
          setUploading1(false);
          setFlights((prevState) => [
            ...prevState,
            {
              id: uuidv4(),
              name: file.name,
              url: url,
            },
          ]);
        });
      });
    });
    setFlightsPdfs([]);
  };

  const uploadHotel = (e) => {
    hotelPdfs.map((file) => {
      setUploading2(true);
      const ref = fireStorage.ref(`onBoard/${file.name}`);
      const task = ref.put(file);
      task.on('state_changed', (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setProgress2(Math.round(per));
      });
      task.then(() => {
        ref.getDownloadURL().then((url) => {
          setProgress2(0);
          setUploading2(false);
          setHotels((prevState) => [
            ...prevState,
            {
              id: uuidv4(),
              name: file.name,
              url: url,
            },
          ]);
        });
      });
    });
    setHotelPdfs([]);
  };

  const uploadVisa = (e) => {
    visaPdfs.map((file) => {
      setUploading3(true);
      const ref = fireStorage.ref(`onBoard/${file.name}`);
      const task = ref.put(file);
      task.on('state_changed', (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setProgress3(Math.round(per));
      });
      task.then(() => {
        ref.getDownloadURL().then((url) => {
          setProgress3(0);
          setUploading3(false);
          setVisa((prevState) => [
            ...prevState,
            {
              id: uuidv4(),
              name: file.name,
              url: url,
            },
          ]);
        });
      });
    });
    setVisaPdfs([]);
  };

  const uploadTourReport = (e) => {
    tourReportsPdfs.map((file) => {
      setUploading4(true);
      const ref = fireStorage.ref(`onBoard/${file.name}`);
      const task = ref.put(file);
      task.on('state_changed', (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setProgress4(Math.round(per));
      });
      task.then(() => {
        ref.getDownloadURL().then((url) => {
          setProgress4(0);
          setUploading4(false);
          setTourReports((prevState) => [
            ...prevState,
            {
              id: uuidv4(),
              name: file.name,
              url: url,
            },
          ]);
        });
      });
    });
    setTourReportsPdfs([]);
  };

  const uploadVoucher = (e) => {
    vouchersPdfs.map((file) => {
      setUploading5(true);
      const ref = fireStorage.ref(`onBoard/${file.name}`);
      const task = ref.put(file);
      task.on('state_changed', (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setProgress5(Math.round(per));
      });
      task.then(() => {
        ref.getDownloadURL().then((url) => {
          setProgress5(0);
          setUploading5(false);
          setVouchers((prevState) => [
            ...prevState,
            {
              id: uuidv4(),
              name: file.name,
              url: url,
            },
          ]);
        });
      });
    });
    setVouchersPdfs([]);
  };

  // const uploadVoucher = (e) => {
  //   setUploading5(true);
  //   const file = e.target.files[0];
  //   const ref = fireStorage.ref(`onBoard/${file.name}`);
  //   const task = ref.put(file);
  //   task.on('state_changed', (taskSnapshot) => {
  //     const per =
  //       (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
  //     setProgress5(Math.round(per));
  //   });
  //   task.then(() => {
  //     ref.getDownloadURL().then((url) => {
  //       setProgress5(0);
  //       setUploading5(false);
  //       setVouchers([
  //         ...vouchers,
  //         {
  //           id: uuidv4(),
  //           name: file.name,
  //           url: url,
  //         },
  //       ]);
  //     });
  //   });
  // };

  const saveOnBoard = () => {
    firedb
      .ref('onBoardDoc')
      .push({
        customerName,
        email,
        phoneNumber,
        bookingValue,
        destination,
        onwardDate,
        returnDate,
        tourType,
        flights: flights.length === 0 ? '' : flights,
        hotels: hotels.length === 0 ? '' : hotels,
        visa: visa.length === 0 ? '' : visa,
        tourReports: tourReports.length === 0 ? '' : tourReports,
        vouchers: vouchers.length === 0 ? '' : vouchers,
      })
      .then(() => {
        setStep(1);
      })
      .catch((error) => console.log('error', error));
  };

  const updateOnBoard = () => {
    firedb
      .ref(`onBoardDoc/${docId}`)
      .update({
        customerName,
        email,
        phoneNumber,
        bookingValue,
        destination,
        onwardDate,
        returnDate,
        tourType,
        flights: flights.length === 0 ? '' : flights,
        hotels: hotels.length === 0 ? '' : hotels,
        visa: visa.length === 0 ? '' : visa,
        tourReports: tourReports.length === 0 ? '' : tourReports,
        vouchers: vouchers.length === 0 ? '' : vouchers,
      })
      .then(() => {
        setStep(1);
      })
      .catch((error) => console.log('error', error));
  };

  const getOnBoard = () => {
    firedb.ref('onBoardDoc').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((d) => {
          if (
            d.val().email === email &&
            d.val().destination === destination &&
            d.val().onwardDate === onwardDate
          ) {
            setDocId(d.key);
            setFlights(d.val().flights);
            setHotels(d.val().hotels);
            setVisa(d.val().visa);
            setTourReports(d.val().tourReports);
            setVouchers(d.val().vouchers);
          }
        });
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getOnBoard();
    return () => (isMounted.current = false);
  }, [step]);

  const removeFlight = (id) => {
    const current = flights.filter((flight) => flight.id !== id);
    setFlights(current);
  };
  const removeHotel = (id) => {
    const current = hotels.filter((hotel) => hotel.id !== id);
    setHotels(current);
  };
  const removeVisa = (id) => {
    const current = visa.filter((visa) => visa.id !== id);
    setVisa(current);
  };
  const removeTourReports = (id) => {
    const current = tourReports.filter((tourReport) => tourReport.id !== id);
    setTourReports(current);
  };
  const removeVouchers = (id) => {
    const current = vouchers.filter((voucher) => voucher.id !== id);
    setVouchers(current);
  };

  const swapFlightUp = (i) => {
    let data = [...flights];
    let temp = data[i];
    data[i] = data[i - 1];
    data[i - 1] = temp;
    setFlights(data);
  };
  const swapFlightDown = (i) => {
    let data = [...flights];
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    setFlights(data);
  };
  const swapHotelUp = (i) => {
    let data = [...hotels];
    let temp = data[i];
    data[i] = data[i - 1];
    data[i - 1] = temp;
    setHotels(data);
  };
  const swapHotelDown = (i) => {
    let data = [...hotels];
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    setHotels(data);
  };
  const swapVisatUp = (i) => {
    let data = [...visa];
    let temp = data[i];
    data[i] = data[i - 1];
    data[i - 1] = temp;
    setVisa(data);
  };
  const swapVisaDown = (i) => {
    let data = [...visa];
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    setVisa(data);
  };
  const swapTourReportsUp = (i) => {
    let data = [...tourReports];
    let temp = data[i];
    data[i] = data[i - 1];
    data[i - 1] = temp;
    setTourReports(data);
  };
  const swapTourReportsDown = (i) => {
    let data = [...tourReports];
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    setTourReports(data);
  };
  const swapVouchersUp = (i) => {
    let data = [...vouchers];
    let temp = data[i];
    data[i] = data[i - 1];
    data[i - 1] = temp;
    setVouchers(data);
  };
  const swapVouchersDown = (i) => {
    let data = [...vouchers];
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    setVouchers(data);
  };

  // const swapFlight = (id) => {
  //   const swap = flights.filter((flight) => flight.id === id);
  //   const remaining = flights.filter((flight) => flight.id !== id);
  //   setFlights([...swap, ...remaining]);
  // };
  // const swapHotel = (id) => {
  //   const swap = hotels.filter((hotel) => hotel.id === id);
  //   const remaining = hotels.filter((hotel) => hotel.id !== id);
  //   setHotels([...swap, ...remaining]);
  // };
  // const swapVisa = (id) => {
  //   const swap = visa.filter((visa) => visa.id === id);
  //   const remaining = visa.filter((visa) => visa.id !== id);
  //   setVisa([...swap, ...remaining]);
  // };
  // const swapTourReports = (id) => {
  //   const swap = tourReports.filter((tourReport) => tourReport.id === id);
  //   const remaining = tourReports.filter((tourReport) => tourReport.id !== id);
  //   setTourReports([...swap, ...remaining]);
  // };
  // const swapVouchers = (id) => {
  //   const swap = vouchers.filter((voucher) => voucher.id === id);
  //   const remaining = vouchers.filter((voucher) => voucher.id !== id);
  //   setVouchers([...swap, ...remaining]);
  // };

  function addInvDesc() {
    setInvoiceData({
      ...invoiceData,
      invoiceDatas: [...invoiceDatas, { invcDes, qty, unitPrice, cgst, sgst }],
    });
    setInvsDes('');
    setInvoiceSingleData({
      qty: '',
      unitPrice: '',
      cgst: '',
      sgst: '',
    });
  }

  function getSubtotal() {
    let total = 0;
    invoiceDatas.forEach((e) => {
      total =
        total +
        parseInt(e.qty) * parseFloat(e.unitPrice) -
        ((parseFloat(e.unitPrice).toFixed(2) * parseFloat(e.cgst).toFixed(2)) /
          100 +
          (parseFloat(e.unitPrice).toFixed(2) * parseFloat(e.sgst).toFixed(2)) /
            100);
    });
    return total;
  }

  const submitInvoice = () => {
    firedb
      .ref('invoice')
      .push({
        email: 'dineshkumardssd@gmail.com',
        html: `${invoiceHtml.current.outerHTML}`,
      })
      .then(() => {
        // setInvoiceData({
        //   invoiceNo: '',
        //   invoiceDate: '',
        //   dueDate: '',
        //   invoiceDatas: [],
        // });
        // setBillTo('');
        // setInvsDes('');
        // setInvoiceSingleData({
        //   qty: '',
        //   unitPrice: '',
        // });
        setInvoicePreviewView(false);
        setInvoiceTypeView(false);
      })
      .catch((err) => console.log('first', err));
  };

  const submitPaymentSucceed = () => {
    firedb
      .ref('paymentSucceed')
      .push({
        email: email,
        destination: destination,
        onwardDate: onwardDate,
        paymentRecieved: paymentRecieved ? false : true,
        expensesChecked: expensesChecked,
      })
      .then(() => {
        setPaymentModifyView(false);
        setPaymentRecieved((prev) => (prev ? false : true));
      })
      .catch((err) => console.log('err', err));
  };

  const updatePaymentSucceed = () => {
    firedb
      .ref(`paymentSucceed/${paymentsId}`)
      .update({
        email: email,
        destination: destination,
        onwardDate: onwardDate,
        paymentRecieved: paymentRecieved ? false : true,
        expensesChecked: expensesChecked,
      })
      .then(() => {
        setPaymentModifyView(false);
        setPaymentRecieved((prev) => (prev ? false : true));
      })
      .catch((err) => console.log('err', err));
  };

  const submitExpensesCheck = () => {
    firedb
      .ref('paymentSucceed')
      .push({
        email: email,
        destination: destination,
        onwardDate: onwardDate,
        paymentRecieved: paymentRecieved,
        expensesChecked: expensesChecked ? false : true,
      })
      .then(() => {
        setExpensesModifyView(false);
        setExpensesChecked((prev) => (prev ? false : true));
      })
      .catch((err) => console.log('err', err));
  };

  const updateExpensesCheck = () => {
    firedb
      .ref(`paymentSucceed/${paymentsId}`)
      .update({
        email: email,
        destination: destination,
        onwardDate: onwardDate,
        paymentRecieved: paymentRecieved,
        expensesChecked: expensesChecked ? false : true,
      })
      .then(() => {
        setExpensesModifyView(false);
        setExpensesChecked((prev) => (prev ? false : true));
      })
      .catch((err) => console.log('err', err));
  };

  const getPaymentSucceed = () => {
    firedb.ref('paymentSucceed').on('value', (data) => {
      if (isPayment.current) {
        data.forEach((d) => {
          if (
            d.val().email === email &&
            d.val().destination === destination &&
            d.val().onwardDate === onwardDate
          ) {
            setPaymentsId(d.key);
            setPaymentRecieved(d.val().paymentRecieved);
            setExpensesChecked(d.val().expensesChecked);
          }
        });
      }
    });
  };

  useEffect(() => {
    isPayment.current = true;
    getPaymentSucceed();
    return () => (isPayment.current = false);
  }, [paymentRecieved, expensesChecked, step]);

  // const getNotifictionss = () => {
  //   let dds = [];
  //   firedb.ref('alert').on('value', (data) => {
  //     if (isNotify.current) {
  //       data.forEach((d) => {
  //         if (
  //           d.val().email === email &&
  //           d.val().destination === destination &&
  //           d.val().onwardDate === onwardDate
  //         ) {
  //           dds.push({
  //             key: d.key,
  //             id: d.val().id,
  //             body: d.val().body,
  //             isPending: d.val().isPending,
  //             reminderDate: d.val().reminderDate,
  //             title: d.val().title,
  //           });
  //         }
  //       });
  //       setNotifyss(dds);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   isNotify.current = true;
  //   getNotifictionss();
  //   return () => (isNotify.current = false);
  // }, [step]);

  useEffect(() => {
    const getNotifictionssData = async () => {
      try {
        const databaseRef = firedb.ref('alert');
        databaseRef.on('value', (snapshot) => {
          setNotifyss([]);
          if (snapshot.exists()) {
            const newData = [];
            snapshot.forEach((childSnapshot) => {
              if (
                childSnapshot.val().email === email &&
                childSnapshot.val().destination === destination &&
                childSnapshot.val().onwardDate === onwardDate
              ) {
                newData.push({
                  key: childSnapshot.key,
                  id: childSnapshot.val().id,
                  body: childSnapshot.val().body,
                  isPending: childSnapshot.val().isPending,
                  reminderDate: childSnapshot.val().reminderDate,
                  title: childSnapshot.val().title,
                });
              }
            });
            setNotifyss(newData);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getNotifictionssData();
    return () => {
      const databaseRef = firedb.ref('alert');
      databaseRef.off();
    };
  }, [newReminder, step]);

  const updateSinglePaymentCheck = () => {
    let newPayment = amountDetails.map((a) => {
      if (a.id === editpaymentId) {
        a.id = editpaymentId;
        a.date = date;
        a.particulars = particulars;
        a.recievedType = recievedType;
        a.recievedAmount = recievedAmount;
        a.spentAmount = spentAmount;
        a.remark = remark;
        a.pv = pv ? false : true;
      }
      return a;
    });
    console.log('newPayment', newPayment);

    firedb
      .ref(`bookingdetails1/${surveyid}/paymentDetails`)
      .set({
        invoiceNumber: invoiceNumber,
        totalAmount: totalAmount,
        amountDetails: newPayment,
      })
      .then(() => {
        addToast('Payment updated Successfully', {
          appearance: 'success',
        });
        setNewPayment({
          date: '',
          particulars: '',
          recievedType: '',
          recievedAmount: 0,
          spentAmount: 0,
          remark: '',
          pv: false,
          id: uuidv4(),
        });
        setEditpaymentId('');
        setPaymentSingleModifyView(false);
      })
      .catch((err) => console.log(`err`, err));
  };

  // const calculateDays = () => {
  //   const start = new Date(onwardDate);
  //   const end = new Date(returnDate);

  //   // Calculate the difference in milliseconds
  //   const diffInMilliseconds = Math.abs(end - start);

  //   // Convert milliseconds to days
  //   const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  //   console.log('days', days);

  //   return days;
  // };

  // console.log('general', general);

  const renderItems = (step) => {
    switch (step) {
      case 1:
        return (
          <div className='bookingGeneral'>
            {edit ? (
              <>
                <div className='paymentMainn'>
                  <h3>General Information</h3>
                  <div className='paymentMainnBtn'>
                    {surveyid && (
                      <button
                        style={{ backgroundColor: 'red', marginRight: 100 }}
                        onClick={openInternationalModal}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
                <div className='bookingGeneralDetails'>
                  <div className='generalInput'>
                    <label>Survey ID</label>
                    <input
                      type='text'
                      value={surveyId}
                      onChange={(e) => setSurveyId(e.target.value)}
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Customer Name</label>
                    <input
                      type='text'
                      value={customerName}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          customerName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Destination</label>
                    <input
                      type='text'
                      value={destination}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          destination: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Email</label>
                    <input
                      type='text'
                      value={email}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Phone Number</label>
                    <input
                      type='number'
                      value={phoneNumber}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='generalInput'>
                    <label>Booked Date</label>
                    <input
                      type='date'
                      value={bookedDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookedDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Booking Value</label>
                    <input
                      type='number'
                      value={bookingValue}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookingValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Tour Type</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowType(!showType);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowGenSales(false);
                          setShowTcs(false);
                        }}>
                        {tourType !== '' ? (
                          <>
                            <div>{tourType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showType ? (
                        <div className='generalLi3'>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tourType: 'International',
                              });
                              setShowType(!showType);
                            }}>
                            International
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tourType: 'Domestic',
                              });
                              setShowType(!showType);
                            }}>
                            Domestic
                          </li>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Customer Pan Number</label>
                    <input
                      type='text'
                      value={panNumber}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          panNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Tcs</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowTcs(!showTcs);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowGenSales(false);
                          setShowType(false);
                        }}>
                        {tcs !== '' ? (
                          <>
                            <div>{tcs}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showTcs ? (
                        <div className='generalLi3'>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tcs: 'Yes',
                              });
                              setShowTcs(!showTcs);
                            }}>
                            Yes
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                tcs: 'No',
                              });
                              setShowTcs(!showTcs);
                            }}>
                            No
                          </li>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Sales Handle Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenSales(!showGenSales);
                          setShowGenBook(false);
                          setShowGenVendor(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {salesHandleName ? (
                          <>
                            <div>{salesHandleName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showGenSales ? (
                        <div className='generalLi1'>
                          {employees?.map((e, i) => {
                            if (
                              e.designation !== 'Junior Software Engg' &&
                              e.designation !== 'CFO'
                            )
                              return (
                                <li
                                  key={i}
                                  onClick={() => {
                                    setGeneral({
                                      ...general,
                                      salesHandleName: e.name,
                                    });
                                    setShowGenSales(!showGenSales);
                                  }}>
                                  {e.name}
                                </li>
                              );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Booking Handle Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenBook(!showGenBook);
                          setShowGenSales(false);
                          setShowGenVendor(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {bookingHandleName ? (
                          <>
                            <div>{bookingHandleName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showGenBook ? (
                        <div className='generalLi2'>
                          {employees?.map((e, i) => {
                            if (
                              e.designation !== 'Junior Software Engg' &&
                              e.designation !== 'CFO' &&
                              e.designation !== 'Travel Associate' &&
                              e.designation !== 'Accounts'
                            )
                              return (
                                <li
                                  key={i}
                                  onClick={() => {
                                    setGeneral({
                                      ...general,
                                      bookingHandleName: e.name,
                                    });
                                    setShowGenBook(!showGenBook);
                                  }}>
                                  {e.name}
                                </li>
                              );
                          })}
                          {/* <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                bookingHandleName: 'Vikash',
                              });
                              setShowGenBook(!showGenBook);
                            }}>
                            Vikash
                          </li>
                          <li
                            onClick={() => {
                              setGeneral({
                                ...general,
                                bookingHandleName: 'Sam',
                              });
                              setShowGenBook(!showGenBook);
                            }}>
                            Sam
                          </li> */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Total Travel Days</label>
                    <input
                      type='text'
                      value={totalTravelDays}
                      readOnly
                      // onChange={(e) =>
                      //   setGeneral({
                      //     ...general,
                      //     totalTravelDays: e.target.value,
                      //   })
                      // }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Payment Due Date</label>
                    <input
                      type='date'
                      value={paymentDueDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          paymentDueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Onward Date</label>
                    <input
                      type='date'
                      value={onwardDate}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          onwardDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Return Date</label>
                    <input
                      type='date'
                      min={onwardDate ? onwardDate : ''}
                      value={returnDate}
                      onChange={(e) => {
                        setGeneral({
                          ...general,
                          returnDate: e.target.value,
                          totalTravelDays: Math.floor(
                            Math.abs(
                              new Date(e.target.value) - new Date(onwardDate)
                            ) /
                              (1000 * 60 * 60 * 24) +
                              1
                          ),
                        });
                      }}
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Adult(s)</label>
                    <input
                      type='number'
                      value={adults}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          adults: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Child(s)</label>
                    <input
                      type='number'
                      value={children}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          children: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='generalInput'>
                    <div className='generalInputtParti'>
                      <label>Vendor Name</label>
                      <div
                        className='generalSelectt'
                        onClick={() => {
                          setShowGenVendor(!showGenVendor);
                          setShowGenBook(false);
                          setShowGenSales(false);
                          setShowTcs(false);
                          setShowType(false);
                        }}>
                        {vendorName ? (
                          <>
                            <div>{vendorName}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {genVendorName && (
                        <>
                          {showGenVendor ? (
                            <div className='generalLi4'>
                              {genVendorName.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setGeneral({
                                        ...general,
                                        vendorName: p,
                                      });
                                      setShowGenVendor(!showGenVendor);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInput'>
                    <label>Remarks</label>
                    <textarea
                      rows={1}
                      value={bookingRemarks}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          bookingRemarks: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInput'>
                    <label>Final Margin</label>
                    <input
                      type='number'
                      value={finalMargin}
                      onChange={(e) =>
                        setGeneral({
                          ...general,
                          finalMargin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='generalInput'>
                  {surveyid === undefined ? (
                    <div className='generalButton'>
                      <button onClick={submitBookingDetails}>Submit</button>
                    </div>
                  ) : (
                    <div className='generalButton'>
                      <button onClick={updateBookingDetails}>Update</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className='bookingGeneralDetails'
                style={{ padding: '1.5em' }}>
                <div className='generalInput'>
                  <label>Survey Id</label>
                  <h6>{surveyId}</h6>
                </div>
                <div className='generalInput'>
                  <label>Customer Name</label>
                  <h6>{customerName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Destination</label>
                  <h6>{destination}</h6>
                </div>
                <div className='generalInput'>
                  <label>Email</label>
                  <h6>{email}</h6>
                </div>
                <div className='generalInput'>
                  <label>Phone Number</label>
                  <h6>{phoneNumber}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booked Date</label>
                  <h6>{bookedDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Value</label>
                  <h6>RS.{numeral(bookingValue).format('0,')}</h6>
                </div>
                <div className='generalInput'>
                  <label>Tcs</label>
                  <h6>{tcs}</h6>
                </div>
                <div className='generalInput'>
                  <label>Tour Type</label>
                  <h6>{tourType}</h6>
                </div>
                <div className='generalInput'>
                  <label>Pan Number</label>
                  <h6>{panNumber}</h6>
                </div>
                <div className='generalInput'>
                  <label>Sales Handle Name</label>
                  <h6>{salesHandleName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Handle Name</label>
                  <h6>{bookingHandleName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Total Travel Days</label>
                  <h6>{totalTravelDays}</h6>
                </div>
                <div className='generalInput'>
                  <label>Payment Due Date</label>
                  <h6>{paymentDueDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Onward Date</label>
                  <h6>{onwardDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Return Date</label>
                  <h6>{returnDate}</h6>
                </div>
                <div className='generalInput'>
                  <label>Adult(s)</label>
                  <h6>{adults}</h6>
                </div>
                <div className='generalInput'>
                  <label>Child(s)</label>
                  <h6>{children}</h6>
                </div>
                <div className='generalInput'>
                  <label>Vendor Name</label>
                  <h6>{vendorName}</h6>
                </div>
                <div className='generalInput'>
                  <label>Booking Remarks</label>
                  <h6>{bookingRemarks}</h6>
                </div>
                <div className='generalInput'>
                  <label>Final Margin</label>
                  <h6>{finalMargin}</h6>
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className='bookingGeneral'>
            <div className='paymentMainn'>
              <h3>Payment Information</h3>
              {/* {exportData() && (
                <div>
                  <ExcelFile element={<button>Export to Excel</button>}>
                    <ExcelSheet data={exportData()} name='finalLogs'>
                      <ExcelColumn label='Date' value='date' />
                      <ExcelColumn label='Particulars' value='particulars' />
                      <ExcelColumn label='Received Type' value='recievedType' />
                      <ExcelColumn
                        label='Received Amount'
                        value='recievedAmount'
                      />
                      <ExcelColumn label='Spent Amount' value='spentAmount' />
                      <ExcelColumn label='Remark' value='remark' />
                      <ExcelColumn
                        label='Total Booking Value'
                        value='totalbookingValue'
                      />
                      <ExcelColumn
                        label='Total Amount Received'
                        value='totalAmountReceived'
                      />
                      <ExcelColumn
                        label='Booking & Vendor Payment'
                        value='BookingVendorPayment'
                      />
                      <ExcelColumn
                        label='Margin Before GST'
                        value='marginBeforeGst'
                      />
                      <ExcelColumn label='GST 5%' value='gst' />
                      <ExcelColumn label='Final Margin' value='finalMargin' />
                      {general.tcs === 'Yes' && (
                        <ExcelColumn label='TCS' value='tcsValue' />
                      )}
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              )} */}
              <div
                onClick={() => setPaymentModifyView(true)}
                className='paymentMainn__Succeed'>
                <>
                  {paymentRecieved ? (
                    <div className='paymentMainn__Succeed_true'>
                      <TiTick className='paymentMainn__Succeed_true_tick' />
                    </div>
                  ) : (
                    <div className='paymentMainn__Succeed_false' />
                  )}
                  <h6>Full Payment Recieved</h6>
                </>
              </div>
              <div
                onClick={() => setExpensesModifyView(true)}
                className='paymentMainn__Succeed'>
                <>
                  {expensesChecked ? (
                    <div className='paymentMainn__Succeed_true'>
                      <TiTick className='paymentMainn__Succeed_true_tick' />
                    </div>
                  ) : (
                    <div className='paymentMainn__Succeed_false' />
                  )}
                  <h6>Expenses Checked</h6>
                </>
              </div>
              <div className='paymentMainnBtn'>
                <button onClick={() => setPaymentOpen(!paymentOpen)}>
                  + Add Payment
                </button>
              </div>
              {paymentOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Date</label>
                    <input
                      type='date'
                      value={date}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Particulars</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowParti(!showParti);
                          setShowRecvType(false);
                        }}>
                        {particulars ? (
                          <>
                            <div>{particulars}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {payParticulars != '' && (
                        <>
                          {showParti ? (
                            <div className='generalLi'>
                              {payParticulars.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        particulars: p,
                                      });
                                      setShowParti(!showParti);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Payment Type</label>
                      <div
                        className='generalSelect'
                        onClick={() => setShowRecvType(!showRecvType)}>
                        {recievedType ? (
                          <>
                            <div>{recievedType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {recvType && (
                        <>
                          {showRecvType ? (
                            <div className='generalLi'>
                              {recvType.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        recievedType: p,
                                      });
                                      setShowRecvType(!showRecvType);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <label>Recieved Amount</label>
                    <input
                      type='number'
                      value={recievedAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          recievedAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Spent Amount</label>
                    <input
                      type='number'
                      value={spentAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          spentAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Remark</label>
                    <input
                      type='text'
                      value={remark}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          remark: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={addPaymentDetails}>Add Payment</button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() => {
                          setPaymentOpen(!paymentOpen);
                          setNewPayment({
                            date: '',
                            particulars: '',
                            recievedType: '',
                            recievedAmount: 0,
                            spentAmount: 0,
                            remark: '',
                          });
                        }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {updatePaymentOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Date</label>
                    <input
                      type='date'
                      value={date}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Particulars</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowParti(!showParti);
                          setShowRecvType(false);
                        }}>
                        {particulars ? (
                          <>
                            <div>{particulars}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {payParticulars != '' && (
                        <>
                          {showParti ? (
                            <div className='generalLi'>
                              {payParticulars.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        particulars: p,
                                      });
                                      setShowParti(!showParti);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Recieved Type</label>
                      <div
                        className='generalSelect'
                        onClick={() => setShowRecvType(!showRecvType)}>
                        {recievedType ? (
                          <>
                            <div>{recievedType}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {recvType && (
                        <>
                          {showRecvType ? (
                            <div className='generalLi'>
                              {recvType.map((p) => {
                                return (
                                  <li
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        recievedType: p,
                                      });
                                      setShowRecvType(!showRecvType);
                                    }}>
                                    {p}
                                  </li>
                                );
                              })}
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                  <div className='generalInputt'>
                    <label>Recieved Amount</label>
                    <input
                      type='number'
                      value={recievedAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          recievedAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Spent Amount</label>
                    <input
                      type='number'
                      value={spentAmount}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          spentAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Remark</label>
                    <input
                      type='text'
                      value={remark}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          remark: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={updatePaymentDetails}>
                        Update Payment
                      </button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() =>
                          setUpdatePaymentOpen(!updatePaymentOpen)
                        }>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {!amountDetails || amountDetails.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1em 0',
                }}>
                <img
                  style={{ height: 280, width: 280 }}
                  src='https://image.freepik.com/free-vector/reminders-concept-illustration_114360-4278.jpg'
                  alt='re'
                />
                <h5 style={{ fontFamily: 'andika' }}>No payments to show</h5>
              </div>
            ) : (
              <div className='b-table scroll-table'>
                <div className='paymentTableHead'>
                  <h5>Date</h5>
                  <h5>Particulars</h5>
                  <h5>Recieved Type</h5>
                  <h5>Recieved Amount</h5>
                  <h5>Spent Amount</h5>
                  <h5>Remark</h5>
                  <h5>Edit</h5>
                  <h5>Pv</h5>
                </div>

                <>
                  {amountDetails.map((c, i) => {
                    return (
                      <div className='paymentTableBody'>
                        <h5>{c.date}</h5>
                        <h5>{c.particulars}</h5>
                        <h5>{c.recievedType}</h5>
                        <h5>
                          {parseInt(c.recievedAmount) === 0
                            ? '-'
                            : numeral(c.recievedAmount).format('0,')}
                        </h5>
                        <h5>
                          {parseInt(c.spentAmount) === 0
                            ? '-'
                            : numeral(c.spentAmount).format('0,')}
                        </h5>
                        <h5>{c.remark}</h5>
                        <h5>
                          <AiFillEdit
                            className='paymentEdit'
                            onClick={() => {
                              setEditpaymentId(c.id);
                              setUpdatePaymentOpen(!updatePaymentOpen);
                              setNewPayment({
                                date: c.date,
                                particulars: c.particulars,
                                recievedType: c.recievedType,
                                recievedAmount: c.recievedAmount,
                                spentAmount: c.spentAmount,
                                remark: c.remark,
                              });
                            }}
                          />
                          <MdDeleteForever
                            className='paymentDelete'
                            onClick={() => {
                              setDeleteId(c.id);
                              openDeletePaymentModal();
                            }}
                          />
                        </h5>
                        {c.pv ? (
                          <h5
                            className='single__Tick'
                            onClick={() => {
                              setEditpaymentId(c.id);
                              setNewPayment({
                                date: c.date,
                                particulars: c.particulars,
                                recievedType: c.recievedType,
                                recievedAmount: c.recievedAmount,
                                spentAmount: c.spentAmount,
                                remark: c.remark,
                                pv: c.pv,
                              });
                              setPaymentSingleModifyView(true);
                            }}>
                            <TiTick className='paymentMainn__Succeed_true_tick' />
                          </h5>
                        ) : (
                          <h5
                            className='single__Tick'
                            onClick={() => {
                              setEditpaymentId(c.id);
                              setNewPayment({
                                date: c.date,
                                particulars: c.particulars,
                                recievedType: c.recievedType,
                                recievedAmount: c.recievedAmount,
                                spentAmount: c.spentAmount,
                                remark: c.remark,
                                pv: c.pv,
                              });
                              setPaymentSingleModifyView(true);
                            }}
                          />
                        )}
                        {/* <h5
                          onClick={() => {
                            setEditpaymentId(c.id);
                            setNewPayment({
                              date: c.date,
                              particulars: c.particulars,
                              recievedType: c.recievedType,
                              recievedAmount: c.recievedAmount,
                              spentAmount: c.spentAmount,
                              remark: c.remark,
                              pv: c.pv,
                            });
                            setPaymentSingleModifyView(true);
                          }}>
                          {c.pv ? (
                            <div className='paymentMainn__Succeed_true'>
                              <TiTick className='paymentMainn__Succeed_true_tick' />
                            </div>
                          ) : (
                            <div className='paymentMainn__Succeed_false' />
                          )}
                        </h5> */}
                      </div>
                    );
                  })}
                </>
                {calculatePayment()[1] !== 0 && (
                  <div className='payment-details'>
                    <div className='single-pay'>
                      <h2>Total Booking Value</h2>
                      <h6>RS.{numeral(bookingValue).format('0,')}</h6>
                    </div>
                    {general.tcs === 'Yes' && (
                      <div className='single-pay'>
                        <h2>TCS 5%</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[2]).format('0,')}
                        </h6>
                      </div>
                    )}
                    <div className='single-pay'>
                      <h2>Total Amount Received</h2>
                      <h6>RS.{numeral(calculatePayment()[0]).format('0,')}</h6>
                    </div>
                    {general.tcs === 'Yes' ? (
                      <div className='single-pay'>
                        <h2>Booking & Vendor Payment + TCS 5%</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[1]).format('0,')}
                        </h6>
                      </div>
                    ) : (
                      <div className='single-pay'>
                        <h2>Booking & Vendor Payment</h2>
                        <h6>
                          RS.{numeral(calculatePayment()[1]).format('0,')}
                        </h6>
                      </div>
                    )}
                    <div className='single-pay'>
                      <h2>Margin Before GST</h2>
                      <h6>RS.{numeral(calculatePayment()[4]).format('0,')}</h6>
                    </div>
                    <div className='single-pay'>
                      <h2> GST 5%</h2>
                      <h6>RS.{numeral(calculatePayment()[3]).format('0,')}</h6>
                    </div>
                    <div className='single-pay final'>
                      <h2>Final Margin </h2>
                      <h6>RS.{numeral(calculatePayment()[5]).format('0,')}</h6>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className='bookingGeneral'>
            <div>
              <h3>Visa Information</h3>
            </div>
            {visaEdit ? (
              <>
                <div className='bookingPaymentDetails'>
                  <div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa On Arrival</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowGenVisaOnArrival(!showGenVisaOnArrival);
                            setShowVisaStat(false);
                            setShowVisaVendor(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaOnArrival ? (
                            <>
                              <div>{visaOnArrival}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showGenVisaOnArrival ? (
                          <div className='generalLi6'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaOnArrival: 'Yes',
                                });
                                setShowGenVisaOnArrival(!showGenVisaOnArrival);
                              }}>
                              Yes
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaOnArrival: 'No',
                                });
                                setShowGenVisaOnArrival(!showGenVisaOnArrival);
                              }}>
                              No
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='generalInput'>
                      <label>Processing Date</label>
                      <input
                        type='date'
                        value={processingDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            processingDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <label>Completed Date</label>
                      <input
                        type='date'
                        value={completedDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            completedDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Status</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaStat(!showVisaStat);
                            setShowVisaVendor(false);
                            setShowGenVisaOnArrival(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaStatus ? (
                            <>
                              <div>{visaStatus}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaStat ? (
                          <div className='generalLi5'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Applied',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Applied
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Pending',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Pending
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaStatus: 'Approved',
                                });
                                setShowVisaStat(!showVisaStat);
                              }}>
                              Approved
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Vendor</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaVendor(!showVisaVendor);
                            setShowVisaStat(false);
                            setShowGenVisaOnArrival(false);
                            setShowVisaApmt(false);
                          }}>
                          {visaVendor ? (
                            <>
                              <div>{visaVendor}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaVendor ? (
                          <div className='generalLi5'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'VFS Global',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              VFS Global
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'TBO Group',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              TBO Group
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaVendor: 'Sky & Sky VISA',
                                });
                                setShowVisaVendor(!showVisaVendor);
                              }}>
                              Sky & Sky VISA
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className='generalInput'>
                      <label>Visa Validity Date</label>
                      <input
                        type='date'
                        value={visaValidityDate}
                        onChange={(e) =>
                          setVisaDetails({
                            ...visaDetails,
                            visaValidityDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='generalInput'>
                      <div className='generalInputtParti'>
                        <label>Visa Appointment</label>
                        <div
                          className='generalSelectt'
                          onClick={() => {
                            setShowVisaApmt(!showVisaApmt);
                            setShowGenVisaOnArrival(false);
                            setShowVisaStat(false);
                            setShowVisaVendor(false);
                          }}>
                          {visaAppointment ? (
                            <>
                              <div>{visaAppointment}</div>
                              <IoIosArrowDown />
                            </>
                          ) : (
                            <>
                              <div>Select</div>
                              <IoIosArrowDown />
                            </>
                          )}
                        </div>
                        {showVisaApmt ? (
                          <div className='generalLi6'>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaAppointment: 'Yes',
                                });
                                setShowVisaApmt(!showVisaApmt);
                              }}>
                              Yes
                            </li>
                            <li
                              onClick={() => {
                                setVisaDetails({
                                  ...visaDetails,
                                  visaAppointment: 'No',
                                });
                                setShowVisaApmt(!showVisaApmt);
                              }}>
                              No
                            </li>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    {visaAppointment === 'Yes' ? (
                      <div className='generalInput'>
                        <label>Visa Appointment Date</label>
                        <input
                          type='date'
                          value={visaAppointmentDate}
                          onChange={(e) =>
                            setVisaDetails({
                              ...visaDetails,
                              visaAppointmentDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='generalButton'>
                  <button onClick={submitVisaDetails}>Submit</button>
                </div>
              </>
            ) : (
              <div className='bookingPaymentDetails'>
                <div>
                  <div className='generalInput'>
                    <label>Visa On Arrival</label>
                    <h6>{visaOnArrival}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Processing Date</label>
                    <h6>{processingDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Completed Date</label>
                    <h6>{completedDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Status</label>
                    <h6>{visaStatus}</h6>
                  </div>
                </div>
                <div>
                  <div className='generalInput'>
                    <label>Visa Vendor</label>
                    <h6>{visaVendor}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Validity Date</label>
                    <h6>{visaValidityDate}</h6>
                  </div>
                  <div className='generalInput'>
                    <label>Visa Appointment</label>
                    <h6>{visaAppointment}</h6>
                  </div>
                  {visaAppointment === 'Yes' ? (
                    <div className='generalInput'>
                      <label>Visa Appointment Date</label>
                      <h6>{visaAppointmentDate}</h6>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className='bookingGeneral'>
            <div className='paymentMainn'>
              <h3>Reminders</h3>
              <div className='paymentMainnBtn'>
                <button onClick={() => setReminderOpen(true)}>
                  + Add Reminder
                </button>
              </div>
              {reminderOpen ? (
                <div className='paymentMainnForm'>
                  <div className='generalInputt'>
                    <label>Title </label>
                    <input
                      type='text'
                      value={title}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Message</label>
                    <input
                      type='text'
                      value={body}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          body: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='generalInputt'>
                    <label>Reminder Date</label>
                    <input
                      style={{
                        marginTop: 12,
                      }}
                      type='date'
                      value={reminderDate}
                      onChange={(e) =>
                        setNewReminder({
                          ...newReminder,
                          reminderDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* <div className='generalInputt'>
                    <div className='generalInputtParti'>
                      <label>Reminder Time</label>
                      <div
                        className='generalSelect'
                        onClick={() => {
                          setShowRemindTime(!showRemindTime);
                        }}>
                        {reminderTime ? (
                          <>
                            <div>{getTime(reminderTime)}</div>
                            <IoIosArrowDown />
                          </>
                        ) : (
                          <>
                            <div>Select</div>
                            <IoIosArrowDown />
                          </>
                        )}
                      </div>
                      {showRemindTime ? (
                        <div className='generalLi7'>
                          {time.map((p) => {
                            return (
                              <li
                                onClick={() => {
                                  setNewReminder({
                                    ...newReminder,
                                    reminderTime: p.value,
                                  });
                                  setShowRemindTime(!showRemindTime);
                                }}>
                                {p.name}
                              </li>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div> */}

                  <div className='generalbtns'>
                    <div className='generalInputtBtn'>
                      <button onClick={addReminders}>Add Reminder</button>
                    </div>
                    <div className='generalInputtBtnCan'>
                      <button
                        onClick={() => {
                          setReminderOpen(false);
                          setNewReminder({
                            id: uuidv4(),
                            reminderDate: '',
                            title: '',
                            body: '',
                            isPending: false,
                          });
                        }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {!notifyss || notifyss.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1em 0',
                }}>
                <img
                  style={{ height: 280, width: 280 }}
                  src='https://image.freepik.com/free-vector/reminders-concept-illustration_114360-4278.jpg'
                  alt='reminder'
                />
                <h5 style={{ fontFamily: 'andika' }}>No reminders to show</h5>
              </div>
            ) : (
              <div className='b-table scroll-table'>
                <div className='paymentTableHead'>
                  <h5>Date</h5>
                  {/* <h5>Time</h5> */}
                  <h5>Title</h5>
                  <h5>Message</h5>
                  <h5>Status</h5>
                  <h5>Mark as Complete</h5>
                </div>
                {notifyss.map((c, i) => {
                  return (
                    <div className='paymentTableBody'>
                      <h5>{c.reminderDate}</h5>
                      {/* <h5>{getTime(c.reminderTime)}</h5> */}
                      <h5>{c.title}</h5>
                      <h5>{c.body}</h5>
                      <h5>{c.isPending ? 'Pending' : 'Completed'}</h5>
                      <h5 style={{ alignSelf: 'center' }}>
                        <Input
                          type='checkbox'
                          checked={!c.isPending}
                          // onChange={() => setReminderComplete(c)}
                          onChange={() =>
                            setNotifyssComplete(c.key, c.isPending)
                          }
                          value={c.isPending}
                        />
                      </h5>
                      {/* <h5 onClick={() => setReminder(c)}>Set</h5> */}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      // case 5:
      //   return (
      //     <div className='bookingGenerall'>
      //       {travellerDocuments.length > 0 && (
      //         <div>
      //           {travellerDocuments.map((d, i) => {
      //             const { documents, name } = d;
      //             return (
      //               <div>
      //                 <h5 className='docHeading'>Documents for {name}</h5>
      //                 <div>
      //                   {documents?.map((file, index) => {
      //                     return (
      //                       <div
      //                         style={{
      //                           display: 'flex',
      //                           flexDirection: 'column',
      //                         }}>
      //                         <a
      //                           target='_blank'
      //                           href={file.fileUrl}
      //                           style={{ fontFamily: 'Andika', paddingTop: 5 }}>
      //                           {index + 1}.{file.fileName}
      //                         </a>
      //                       </div>
      //                     );
      //                   })}
      //                 </div>
      //               </div>
      //             );
      //           })}
      //         </div>
      //       )}

      //       {childrenDocuments.length > 0 && (
      //         <div>
      //           {childrenDocuments.map((d, i) => {
      //             const { documentsc, namec } = d;
      //             return (
      //               <div>
      //                 <h5 className='docHeading'>Documents for {namec}</h5>
      //                 <div>
      //                   {documentsc?.map((file, index) => {
      //                     return (
      //                       <div
      //                         style={{
      //                           display: 'flex',
      //                           flexDirection: 'column',
      //                         }}>
      //                         <a
      //                           target='_blank'
      //                           href={file.fileUrl}
      //                           style={{ fontFamily: 'Andika', paddingTop: 5 }}>
      //                           {index + 1}.{file.fileName}
      //                         </a>
      //                       </div>
      //                     );
      //                   })}
      //                 </div>
      //               </div>
      //             );
      //           })}
      //         </div>
      //       )}
      //     </div>
      //   );
      case 5:
        return (
          <div>
            <div className='bookingGenerall_upld__btn__save'>
              <button onClick={docId ? updateOnBoard : saveOnBoard}>
                {docId ? 'Update' : 'Save'}
              </button>
            </div>
            {/* {uploading1 && (
              <div>
                <h6>File uploading {progress1}%</h6>
              </div>
            )} */}
            <div className='bookingGenerall_upld_main'>
              <div className='bookingGenerall_upld'>
                <div className='bookingGenerall_upld__btn'>
                  <div>Flights</div>
                  {flightPdfs.length === 0 ? (
                    <>
                      <input
                        type='file'
                        multiple
                        id='booking_doc_file'
                        className='booking_doc_file_c'
                        onChange={(e) => {
                          chooseFlight(e);
                        }}
                      />
                      <label
                        htmlFor='booking_doc_file'
                        className='booking_doc_file_l'>
                        Choose file
                      </label>
                    </>
                  ) : (
                    <label
                      className='booking_doc_file_l'
                      onClick={uploadFlight}>
                      Upload
                    </label>
                  )}
                  {uploading1 && (
                    <div className='uploading_filesss'>
                      <h6>File uploading {progress1}%</h6>
                    </div>
                  )}
                </div>
                {flights.length !== 0 && (
                  <div>
                    {flights.map((file, i) => {
                      return (
                        <div className='booking_doc_file_flex'>
                          <h6
                            onClick={() => setPdfUrl(file.url)}
                            className='booking_doc_file_flex_h6'>
                            {file.name}
                          </h6>
                          <MdDelete
                            onClick={() => removeFlight(file.id)}
                            className='booking_doc_file_flex_icon'
                          />
                          {i !== 0 && i !== flights.length - 1 && (
                            <AiOutlineArrowUp
                              onClick={() => swapFlightUp(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                          {i !== 0 && i !== flights.length - 1 && (
                            <AiOutlineArrowDown
                              onClick={() => swapFlightDown(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='bookingGenerall_upld'>
                <div className='bookingGenerall_upld__btn'>
                  <div>Hotels</div>
                  {hotelPdfs.length === 0 ? (
                    <>
                      <input
                        type='file'
                        multiple
                        id='booking_doc_file_'
                        className='booking_doc_file_c'
                        onChange={(e) => {
                          chooseHotel(e);
                        }}
                      />
                      <label
                        htmlFor='booking_doc_file_'
                        className='booking_doc_file_l'>
                        Choose file
                      </label>
                    </>
                  ) : (
                    <label className='booking_doc_file_l' onClick={uploadHotel}>
                      Upload
                    </label>
                  )}
                  {uploading2 && (
                    <div className='uploading_filesss'>
                      <h6>File uploading {progress2}%</h6>
                    </div>
                  )}
                </div>
                {hotels.length !== 0 && (
                  <div>
                    {hotels.map((file, i) => {
                      return (
                        <div className='booking_doc_file_flex'>
                          <h6
                            onClick={() => setPdfUrl(file.url)}
                            className='booking_doc_file_flex_h6'>
                            {file.name}
                          </h6>
                          <MdDelete
                            onClick={() => removeHotel(file.id)}
                            className='booking_doc_file_flex_icon'
                          />
                          {i !== 0 && i !== hotels.length - 1 && (
                            <AiOutlineArrowUp
                              onClick={() => swapHotelUp(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                          {i !== 0 && i !== hotels.length - 1 && (
                            <AiOutlineArrowDown
                              onClick={() => swapHotelDown(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='bookingGenerall_upld'>
                <div className='bookingGenerall_upld__btn'>
                  <div>Visa</div>
                  {visaPdfs.length === 0 ? (
                    <>
                      <input
                        type='file'
                        multiple
                        id='booking_doc_file__'
                        className='booking_doc_file_c'
                        onChange={(e) => {
                          chooseVisa(e);
                        }}
                      />
                      <label
                        htmlFor='booking_doc_file__'
                        className='booking_doc_file_l'>
                        Choose file
                      </label>
                    </>
                  ) : (
                    <label className='booking_doc_file_l' onClick={uploadVisa}>
                      Upload
                    </label>
                  )}

                  {uploading3 && (
                    <div className='uploading_filesss'>
                      <h6>File uploading {progress3}%</h6>
                    </div>
                  )}
                </div>
                {visa.length !== 0 && (
                  <div>
                    {visa.map((file, i) => {
                      return (
                        <div className='booking_doc_file_flex'>
                          <h6
                            onClick={() => setPdfUrl(file.url)}
                            className='booking_doc_file_flex_h6'>
                            {file.name}
                          </h6>
                          <MdDelete
                            onClick={() => removeVisa(file.id)}
                            className='booking_doc_file_flex_icon'
                          />
                          {i !== 0 && i !== visa.length - 1 && (
                            <AiOutlineArrowUp
                              onClick={() => swapVisatUp(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                          {i !== 0 && i !== visa.length - 1 && (
                            <AiOutlineArrowDown
                              onClick={() => swapVisaDown(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='bookingGenerall_upld'>
                <div className='bookingGenerall_upld__btn'>
                  <div>Tour Reports</div>
                  {tourReportsPdfs.length === 0 ? (
                    <>
                      <input
                        type='file'
                        multiple
                        id='booking_doc_file___'
                        className='booking_doc_file_c'
                        onChange={(e) => {
                          chooseTourReport(e);
                        }}
                      />
                      <label
                        htmlFor='booking_doc_file___'
                        className='booking_doc_file_l'>
                        Choose file
                      </label>
                    </>
                  ) : (
                    <label
                      className='booking_doc_file_l'
                      onClick={uploadTourReport}>
                      Upload
                    </label>
                  )}

                  {uploading4 && (
                    <div className='uploading_filesss'>
                      <h6>File uploading {progress4}%</h6>
                    </div>
                  )}
                </div>
                {tourReports.length !== 0 && (
                  <div>
                    {tourReports.map((file, i) => {
                      return (
                        <div className='booking_doc_file_flex'>
                          <h6
                            onClick={() => setPdfUrl(file.url)}
                            className='booking_doc_file_flex_h6'>
                            {file.name}
                          </h6>
                          <MdDelete
                            onClick={() => removeTourReports(file.id)}
                            className='booking_doc_file_flex_icon'
                          />
                          {i !== 0 && i !== tourReports.length - 1 && (
                            <AiOutlineArrowUp
                              onClick={() => swapTourReportsUp(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                          {i !== 0 && i !== tourReports.length - 1 && (
                            <AiOutlineArrowDown
                              onClick={() => swapTourReportsDown(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='bookingGenerall_upld'>
                <div className='bookingGenerall_upld__btn'>
                  <div>Vouchers</div>
                  {vouchersPdfs.length === 0 ? (
                    <>
                      <input
                        type='file'
                        multiple
                        id='booking_doc_file____'
                        className='booking_doc_file_c'
                        onChange={(e) => {
                          chooseVoucher(e);
                        }}
                      />
                      <label
                        htmlFor='booking_doc_file____'
                        className='booking_doc_file_l'>
                        Choose file
                      </label>
                    </>
                  ) : (
                    <label
                      className='booking_doc_file_l'
                      onClick={uploadVoucher}>
                      Upload
                    </label>
                  )}

                  {uploading5 && (
                    <div className='uploading_filesss'>
                      <h6>File uploading {progress5}%</h6>
                    </div>
                  )}
                </div>
                {vouchers.length !== 0 && (
                  <div>
                    {vouchers.map((file, i) => {
                      return (
                        <div className='booking_doc_file_flex'>
                          <h6
                            onClick={() => setPdfUrl(file.url)}
                            className='booking_doc_file_flex_h6'>
                            {file.name}
                          </h6>
                          <MdDelete
                            onClick={() => removeVouchers(file.id)}
                            className='booking_doc_file_flex_icon'
                          />
                          {i !== 0 && i !== vouchers.length - 1 && (
                            <AiOutlineArrowUp
                              onClick={() => swapVouchersUp(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                          {i !== 0 && i !== vouchers.length - 1 && (
                            <AiOutlineArrowDown
                              onClick={() => swapVouchersDown(i)}
                              className='booking_doc_file_flex_flex_icon'
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className='bookingGeneral'>
            <div className='invoiceMainn'>
              <h3>Invoice</h3>
              <div className='invoiceMainnBtn'>
                <button onClick={() => setInvoiceTypeView(true)}>
                  + Add Invoice
                </button>
              </div>
            </div>
            {/* <div onClick={() => setInvoiceView(true)}>sdfsd</div> */}
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div className='bookingRecord'>
      {paymentSingleModifyView && (
        <div className='paymentSuceedViewMain'>
          <div className='paymentSuceedViewMain___Sub'>
            <p className='paymentSuceedViewMain___Sub__p'>
              Are you sure want to modify Single Payment!
            </p>
            <div>
              <button
                onClick={updateSinglePaymentCheck}
                className='paymentSuceedViewMain___Sub__btn1'>
                Confirm
              </button>
              <button
                onClick={() => setPaymentSingleModifyView(false)}
                className='paymentSuceedViewMain___Sub__btn2'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {paymentModifyView && (
        <div className='paymentSuceedViewMain'>
          <div className='paymentSuceedViewMain___Sub'>
            <p className='paymentSuceedViewMain___Sub__p'>
              Are you sure want to modify Full Payment Recieved!
            </p>
            <div>
              <button
                onClick={
                  paymentsId ? updatePaymentSucceed : submitPaymentSucceed
                }
                className='paymentSuceedViewMain___Sub__btn1'>
                Confirm
              </button>
              <button
                onClick={() => setPaymentModifyView(false)}
                className='paymentSuceedViewMain___Sub__btn2'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {expensesModifyView && (
        <div className='paymentSuceedViewMain'>
          <div className='paymentSuceedViewMain___Sub'>
            <p className='paymentSuceedViewMain___Sub__p'>
              Are you sure want to modify Expenses Checked!
            </p>
            <div>
              <button
                onClick={paymentsId ? updateExpensesCheck : submitExpensesCheck}
                className='paymentSuceedViewMain___Sub__btn1'>
                Confirm
              </button>
              <button
                onClick={() => setExpensesModifyView(false)}
                className='paymentSuceedViewMain___Sub__btn2'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {invoicePreviewView && (
        <div
          style={{
            position: 'absolute',
            content: '',
            zIndex: 500,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            width: '100%',
            height: 'auto',
            minHeight: '120vh',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <div
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: '10px',
            }}
            ref={invoiceHtml}>
            <center
              style={{
                width: '100%',
                tableLayout: 'fixed',
              }}>
              <table
                style={{
                  background: 'linear-gradient(#83EAF1, #63A4FF)',
                  width: '100%',
                }}>
                <tr>
                  <td style={{ width: '70%' }}>
                    <div style={{ width: '200px', height: '180px' }}>
                      <img
                        src='https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/logof.png?alt=media&token=a45a95ae-e4a8-469d-a03d-2b20c6f2a484'
                        alt='logo'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          margin: '10px',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: '#fff',
                        }}>
                        tour On (A Brand of Lotsatravel Holidays LLP)
                      </p>
                      <p
                        style={{
                          margin: '10px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>
                        Chennai <br />
                        Tamil Nadu 600073 <br />
                        GST Number: 33AAHFL7839F1Z6 <br />
                        GSTIN: 33AAHFL7839F1Z6
                      </p>
                    </div>
                  </td>
                  <td style={{ width: '30%' }}>
                    <p
                      style={{
                        marginBottom: '200px',
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: '30px',
                      }}>
                      tourOn Invoice
                    </p>
                  </td>
                </tr>
              </table>
              <table
                style={{
                  width: '100%',
                  marginTop: '20px',
                  marginLeft: '30px',
                }}>
                <tr>
                  <td style={{ width: '70%' }}>
                    <p
                      style={{
                        marginTop: '10px',
                        marginBottom: 0,
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#63a4ff',
                      }}>
                      Bill to
                    </p>
                    <div
                      dangerouslySetInnerHTML={{ __html: billTo }}
                      style={{ fontWeight: 'bold' }}
                    />
                  </td>
                  <td style={{ width: '30%' }}>
                    <p
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}>
                      Invoice No : {invoiceNo}
                    </p>
                    <p
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}>
                      Invoice Date : {invoiceDate}
                    </p>
                    <p
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}>
                      Due Date : {dueDate}
                    </p>
                  </td>
                </tr>
              </table>
              <table
                style={{
                  width: '100%',
                  marginTop: '30px',
                }}>
                <tr style={{ backgroundColor: '#63a4ff' }}>
                  <th style={{ width: '10%', fontSize: '16px' }}>Qty</th>
                  <th style={{ width: '35%', fontSize: '16px' }}>Desc</th>
                  <th style={{ width: '12%', fontSize: '16px' }}>Unit Price</th>
                  <th style={{ width: '12%', fontSize: '16px' }}>CGST</th>
                  <th style={{ width: '12%', fontSize: '16px' }}>SGST</th>
                  <th style={{ width: '12%', fontSize: '16px' }}>Amount</th>
                </tr>
                {invoiceDatas.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          width: '10%',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>
                        {e.qty}
                      </td>
                      <td
                        dangerouslySetInnerHTML={{ __html: e.invcDes }}
                        style={{
                          width: '35%',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      />
                      <td
                        style={{
                          width: '12%',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>
                        {parseFloat(e.unitPrice).toFixed(2)}
                      </td>
                      <td style={{ width: '12%' }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}>
                          {parseFloat(
                            (parseFloat(e.unitPrice).toFixed(2) *
                              parseFloat(e.cgst).toFixed(2)) /
                              100
                          ).toFixed(2)}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: 'gray',
                          }}>
                          {e.cgst}%
                        </div>
                      </td>
                      <td style={{ width: '12%' }}>
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}>
                          {parseFloat(
                            (parseFloat(e.unitPrice).toFixed(2) *
                              parseFloat(e.sgst).toFixed(2)) /
                              100
                          ).toFixed(2)}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: 'gray',
                          }}>
                          {e.sgst}%
                        </div>
                      </td>
                      <td
                        style={{
                          width: '12%',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}>
                        {parseFloat(
                          parseInt(e.qty) * parseFloat(e.unitPrice) -
                            ((parseFloat(e.unitPrice).toFixed(2) *
                              parseFloat(e.cgst).toFixed(2)) /
                              100 +
                              (parseFloat(e.unitPrice).toFixed(2) *
                                parseFloat(e.sgst).toFixed(2)) /
                                100)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
                {invoiceDatas.length > 0 && (
                  <tr>
                    <td style={{ width: '10%' }}></td>
                    <td style={{ width: '35%' }}></td>
                    <td style={{ width: '12%' }}></td>
                    <td style={{ width: '12%' }}></td>
                    <td style={{ width: '12%' }}>
                      <h4
                        style={{
                          fontWeight: 'bold',
                          color: '#63a4ff',
                          fontSize: '16px',
                        }}>
                        Total
                      </h4>
                    </td>
                    <td
                      style={{
                        width: '12%',
                        fontWeight: 'bold',
                        fontSize: '16px',
                      }}>
                      {parseFloat(getSubtotal()).toFixed(2)}
                    </td>
                  </tr>
                )}
              </table>
              <table
                style={{
                  background: 'linear-gradient(#83EAF1, #63A4FF)',
                  width: '100%',
                  marginTop: '30px',
                }}>
                <tr>
                  <td>
                    <p
                      style={{
                        margin: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Notes
                    </p>
                    <p
                      style={{
                        margin: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}>
                      We will share the list of all other Sightseeing locations
                      from which you can choose what you wanted to see during
                      your Leisure Days. <br />
                      Happy Touring!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p
                      style={{
                        margin: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Terms & Conditions
                    </p>
                    <p
                      style={{
                        margin: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}>
                      Cancellation Charges & Refunds are subject to the
                      transportation / accommodation / activities / tour
                      providers through which your reservations are made. <br />
                      Our Service Fee is 50% Refundable if cancellation done
                      before 15 days and 100% non-refundable when cancelled on
                      or after 14 day. Discount amount will not be considered
                      during cancellation !
                    </p>
                  </td>
                </tr>
              </table>
            </center>
          </div>
          <div>
            <button onClick={() => submitInvoice()}>Send mail</button>
            <button onClick={() => setInvoicePreviewView(false)}>Close</button>
          </div>
        </div>
      )}
      {invoiceTypeView && (
        <div className='invoice_sample_mainnn_type'>
          <button
            className='invoice_sample_mainnn_type_cls'
            onClick={() => setInvoiceTypeView(false)}>
            Close
          </button>
          {/* <button
            className='invoice_sample_mainnn_type_cls'
            onClick={() => submitInvoice()}>
            Submit
          </button> */}
          <button
            className='invoice_sample_mainnn_type_cls'
            onClick={() => setInvoicePreviewView(true)}>
            Preview
          </button>
          <div className='invoice_sample_mainnn_type_field'>
            <div className='invoice_sample_mainnn_type_field1'>
              <div className='invoice_sample_mainnn_type_field1_flx'>
                <div>
                  <label>Invoice no:</label>
                  <input
                    type='text'
                    value={invoiceNo}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        invoiceNo: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Invoice Date:</label>
                  <input
                    type='date'
                    value={invoiceDate}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        invoiceDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Due Date:</label>
                  <input
                    type='date'
                    value={dueDate}
                    onChange={(e) =>
                      setInvoiceData({
                        ...invoiceData,
                        dueDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label>Bill to:</label>
                <div style={{ width: '80%' }}>
                  <JoditEditor
                    ref={billto}
                    value={billTo}
                    onChange={(newContent) => setBillTo(newContent)}
                  />
                </div>
              </div>
              <button onClick={addInvDesc}>Add</button>
              <div>
                <label>Desc:</label>
                <div style={{ width: '80%' }}>
                  <JoditEditor
                    ref={invoiceDes}
                    value={invcDes}
                    onChange={(newContent) => setInvsDes(newContent)}
                  />
                </div>
              </div>
              <div className='invoice_sample_mainnn_type_field1_flx'>
                <div>
                  <label>Qty:</label>
                  <input
                    type='text'
                    value={qty}
                    onChange={(e) =>
                      setInvoiceSingleData({
                        ...invoiceSingleData,
                        qty: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Unit Price:</label>
                  <input
                    type='text'
                    value={unitPrice}
                    onChange={(e) =>
                      setInvoiceSingleData({
                        ...invoiceSingleData,
                        unitPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>CGST:</label>
                  <input
                    type='text'
                    value={cgst}
                    onChange={(e) =>
                      setInvoiceSingleData({
                        ...invoiceSingleData,
                        cgst: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>SGST:</label>
                  <input
                    type='text'
                    value={sgst}
                    onChange={(e) =>
                      setInvoiceSingleData({
                        ...invoiceSingleData,
                        sgst: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className='invoice_sample_mainnn_type_field2'>
              <div>
                <h3>Invoice</h3>
              </div>
              <div className='invoice_sample_mainnn_type_field2_invc'>
                <div>
                  <h6>
                    Bill to:{' '}
                    <span dangerouslySetInnerHTML={{ __html: billTo }} />
                  </h6>
                </div>
                <div>
                  <h6>Invoice: {invoiceNo}</h6>
                  <h6>Invoice Date: {invoiceDate}</h6>
                  <h6>Due Date: {dueDate}</h6>
                </div>
              </div>
              <table className='invoice_sample_mainnn_type_field2_tabl'>
                <thead>
                  <tr>
                    <th>Qty</th>
                    <th>Desc</th>
                    <th>Unit Price</th>
                    <th>CGST</th>
                    <th>SGST</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDatas.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.qty}</td>
                        <td dangerouslySetInnerHTML={{ __html: e.invcDes }} />
                        <td>{parseFloat(e.unitPrice).toFixed(2)}</td>
                        <td>
                          <div>
                            {parseFloat(
                              (parseFloat(e.unitPrice).toFixed(2) *
                                parseFloat(e.cgst).toFixed(2)) /
                                100
                            ).toFixed(2)}
                          </div>
                          <div>{e.cgst}%</div>
                        </td>
                        <td>
                          <div>
                            {parseFloat(
                              (parseFloat(e.unitPrice).toFixed(2) *
                                parseFloat(e.sgst).toFixed(2)) /
                                100
                            ).toFixed(2)}
                          </div>
                          <div>{e.sgst}%</div>
                        </td>
                        <td>
                          {parseFloat(
                            parseInt(e.qty) * parseFloat(e.unitPrice) -
                              ((parseFloat(e.unitPrice).toFixed(2) *
                                parseFloat(e.cgst).toFixed(2)) /
                                100 +
                                (parseFloat(e.unitPrice).toFixed(2) *
                                  parseFloat(e.sgst).toFixed(2)) /
                                  100)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  {invoiceDatas.length > 0 && (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Subtotal</td>
                      <td>{parseFloat(getSubtotal()).toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {pdfUrl && (
        <div className='pdf_Popup'>
          <div className='pdf_Popup_con'>
            <embed
              type='application/pdf'
              src={pdfUrl}
              className='pdf_Popup_con_main'
            />
            <div
              className='pdf_Popup_con_main_close'
              onClick={() => setPdfUrl(null)}>
              x
            </div>
          </div>
        </div>
      )}
      <Modal
        className='modal-dialog-centered modal-danger'
        contentClassName='bg-gradient-danger'
        isOpen={internationalModal}>
        <div className='modal-header'>
          <h6 className='modal-title' id='modal-title-notification'>
            Cancel Booking - {surveyId}
          </h6>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={closeInternationalModal}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='cancel-booking'>
          <div className='generalInput'>
            <label>Reason for cancellation</label>
            <textarea
              value={cancelBookingRemarks}
              onChange={(e) =>
                setGeneral({
                  ...general,
                  cancelBookingRemarks: e.target.value,
                })
              }
            />
          </div>
          <div className='cancel-check'>
            <Input
              type='checkbox'
              checked={isBookingCancelled}
              onChange={() =>
                setGeneral({
                  ...general,
                  isBookingCancelled: !isBookingCancelled,
                })
              }
              value={isBookingCancelled}
            />
            <h6>
              Once a booking is cancelled, this data cannot be retrieved. Are
              you sure you want to proceed?
            </h6>
          </div>
          <div className='paymentMainnBtn cancel-button'>
            <button
              disabled={!isBookingCancelled}
              onClick={() => {
                cancelBookingdetails();
                setInternationalModal(false);
              }}
              style={{ backgroundColor: isBookingCancelled ? 'red' : 'gray' }}>
              Cancel Booking
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className='modal-dialog-centered modal-danger'
        contentClassName='bg-gradient-danger'
        isOpen={showDeletePaymentModal}>
        <div className='modal-header'>
          <h6 className='modal-title' id='modal-title-notification'>
            Delete Payment
          </h6>
          <button
            aria-label='Close'
            className='close'
            data-dismiss='modal'
            type='button'
            onClick={closeDeletePaymentModal}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className='deletePaymentModal'>
          <div className='deletePaymentModalflex'>
            <FiAlertTriangle className='deletePaymentIcon' />
            <h6>Are you sure you want to delete this Payment?</h6>
          </div>
          <div className='deletePaymentModalButton'>
            <button onClick={closeDeletePaymentModal}>Cancel</button>
            <button
              onClick={() => {
                deletePaymentDetails(deleteId);
                closeDeletePaymentModal();
              }}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
      {isNewRecord && (
        <div className='bookingMain'>
          <h5>Survey ID : {surveyId} </h5>
          <h5>Name : {customerName}</h5>
          <h5>Destination : {destination}</h5>
          <h5>Onward Date : {onwardDate}</h5>
          <h5>Return Date: {returnDate}</h5>
        </div>
      )}
      <div className='bookingTermMain'>
        <div className='bookingTerm'>
          <div
            className={step === 1 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(1);
            }}
            className={step === 1 ? 'bb' : 'bc'}>
            General
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 2 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(2);
            }}
            className={step === 2 ? 'bb' : 'bc'}>
            Payment
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 3 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(3);
            }}
            className={step === 3 ? 'bb' : 'bc'}>
            Visa
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 4 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(4);
            }}
            className={step === 4 ? 'bb' : 'bc'}>
            Reminders
          </h6>
          <div className='bookingBorder'></div>
          <div
            className={step === 5 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(5);
            }}
            className={step === 5 ? 'bb' : 'bc'}>
            Documents
          </h6>
          {/* <div className='bookingBorder'></div> */}
          {/* <div
            className={step === 6 ? 'bookingColor' : 'bookingColorNon'}></div>
          <h6
            onClick={() => {
              if (isNewRecord) setStep(6);
            }}
            className={step === 6 ? 'bb' : 'bc'}>
            Invoice
          </h6> */}

          {/* {travellerDocuments?.length > 0 && (
            <>
              <div className='bookingBorder'></div>

              <div
                className={
                  step === 5 ? 'bookingColor' : 'bookingColorNon'
                }></div>
              <h6
                onClick={() => {
                  if (isNewRecord) setStep(5);
                }}
                className={step === 5 ? 'bb' : 'bc'}>
                Documents
              </h6>
            </>
          )} */}
        </div>
        <div className='renderTerm'>
          {detailsLoaded ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Spinner
                style={{ width: '4rem', height: '4rem' }}
                color='primary'
              />
            </div>
          ) : (
            <>
              <div>{renderItems(step)}</div>
              {step === 1 ? (
                <div className='bookingEdit' onClick={() => setEdit(!edit)}>
                  <BiEdit className='bookingArrowIcon' />
                </div>
              ) : null}
              {step === 3 ? (
                <div
                  className='bookingEdit'
                  onClick={() => setVisaEdit(!visaEdit)}>
                  <BiEdit className='bookingArrowIcon' />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingRecord;
