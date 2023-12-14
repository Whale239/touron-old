import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { ApiContext } from '../Context/ApiContext';
import moment from 'moment';
import { firedb } from '../firebase';
import '../SalesAdmin component/SalesRequest.css';
import './TotalSaleReport.css';
import { IoIosArrowDown } from 'react-icons/io';
import ReactExport from 'react-export-excel';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
);

const TotalSaleReport = () => {
  const isMounted = useRef(false);
  const { employees } = useContext(ApiContext);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [requestDetails, setRequestDetails] = useState([]);
  const [bookedData, setBookedData] = useState([]);
  const [bookedValueData, setBookedValueData] = useState([]);
  const [bookedMarginValueData, setBookedMarginValueData] = useState([]);
  const [onwardData, setOnwardData] = useState([]);
  const [reqBookedData, setReqBookedData] = useState([]);
  const [bookCancelled, setBookCancelled] = useState([]);
  const [bookingState, setBookingState] = useState('');
  const [showBookingState, setShowBookingState] = useState(false);
  const [bookingStateYear, setBookingStateYear] = useState('');
  const [showBookingStateYear, setShowBookingStateYear] = useState(false);
  const [bookingValue, setBookingValue] = useState('');
  const [showBookingValue, setShowBookingValue] = useState(false);
  const [bookingValueYear, setBookingValueYear] = useState('');
  const [showBookingValueYear, setShowBookingValueYear] = useState(false);
  const [marginBookingValue, setMarginBookingValue] = useState('');
  const [showMarginBookingValue, setShowMarginBookingValue] = useState(false);
  const [marginBookingValueYear, setMarginBookingValueYear] = useState('');
  const [showMarginBookingValueYear, setShowMarginBookingValueYear] =
    useState(false);
  const [travelState, setTravelState] = useState('');
  const [showTravelState, setShowTravelState] = useState(false);
  const [travelStateYear, setTravelStateYear] = useState('');
  const [showTravelStateYear, setShowTravelStateYear] = useState(false);
  const [requestValue, setRequestValue] = useState('');
  const [showRequestValue, setShowRequestValue] = useState(false);
  const [requestValueYear, setRequestValueYear] = useState('');
  const [showRequestValueYear, setShowRequestValueYear] = useState(false);
  const [exportYear, setExportYear] = useState('');
  // const [exportYearSales, setExportYearSales] = useState('');
  const [reqData, setReqData] = useState([
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ]);
  const [loader, setLoader] = useState(false);

  const empl = employees
    .filter(
      (a) => a.designation === 'CEO' || a.designation == 'Travel Associate'
    )
    .map((a) => a.name);
  const years = ['All', '2020', '2021', '2022', '2023', '2024', '2025'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const empNames = ['All', ...empl];

  let month = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];
  let month1 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  let month2 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  let month3 = [
    {
      name: 'January',
      val: [],
    },
    {
      name: 'Feburary',
      val: [],
    },
    {
      name: 'March',
      val: [],
    },
    {
      name: 'April',
      val: [],
    },
    {
      name: 'May',
      val: [],
    },
    {
      name: 'June',
      val: [],
    },
    {
      name: 'July',
      val: [],
    },
    {
      name: 'August',
      val: [],
    },
    {
      name: 'September',
      val: [],
    },
    {
      name: 'October',
      val: [],
    },
    {
      name: 'November',
      val: [],
    },
    {
      name: 'December',
      val: [],
    },
  ];

  const getAllBookingDetail = () => {
    setLoader(true);
    let booking = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      if (isMounted.current) {
        if (data.val() === null || data.val() === undefined) {
          return;
        }
        data.forEach((i) => {
          if (
            i.val().general.bookedDate !== '' &&
            i.val().general.onwardDate !== ''
          ) {
            let booked = moment(i.val().general.bookedDate).month();
            let onward = moment(i.val().general.onwardDate).month();
            if (!i.val().general.isBookingCancelled) {
              month[booked].val.push(i.val());
              month1[onward].val.push(i.val());
            }
            if (i.val().general.isBookingCancelled) {
              month3[booked].val.push(i.val());
            }
            booking.push(i.val());
          }
        });

        setBookedValueData(month);
        setBookedData(month);
        setBookingDetails(booking);
        setReqBookedData(month);
        setOnwardData(month1);
        setBookedMarginValueData(month1);
        setBookCancelled(month3);
        setLoader(false);
        // setBookedData([...month])
        // setReqBookedData([...month])
        // setOnwardData([...month1])
        // setBookCancelled([...month3])
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getAllBookingDetail();
    return () => (isMounted.current = false);
  }, []);

  const salesBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingStateYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            bookingStateYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedData([...month])
    setBookedData(month);
    return month;
  };

  const salesBookCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesYear = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            bookingState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedData([...month])
    setBookedData(month);
    return month;
  };

  const salesBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            bookingValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedValueData([...month])
    setBookedValueData(month);
    return month;
  };

  const salesYearBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            bookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            bookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedValueData([...month])
    setBookedValueData(month);
    return month;
  };

  const salesTravelCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.onwardDate &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesTravelValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            travelStateYear === moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            travelStateYear === moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setOnwardData([...month1])
    setOnwardData(month1);
    return month1;
  };

  const salesYearTravelValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            travelState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            s === moment(c.general.onwardDate).format('YYYY') &&
            travelState === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setOnwardData([...month1])
    setOnwardData(month1);
    return month1;
  };

  const salesMarginBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            marginBookingValueYear ===
              moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            marginBookingValueYear ===
              moment(c.general.onwardDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedMarginValueData([...month])
    setBookedMarginValueData(month1);
    return month1;
  };

  const salesYearMarginBookValue = (s) => {
    bookingDetails.forEach((c, i) => {
      month1.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.onwardDate).month() &&
            marginBookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.onwardDate).month() &&
            s === moment(c.general.onwardDate).format('YYYY') &&
            marginBookingValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookedMarginValueData([...month])
    setBookedMarginValueData(month1);
    return month1;
  };

  const salesReqBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setReqBookedData([...month])
    setReqBookedData(month);
    return month;
  };

  const salesReqCount = (s) => {
    let count = [];
    requestDetails.forEach((c, i) => {
      if (c.salesHandleName === s && c.requestDate) {
        count.push(c);
      }
    });
    return count;
  };

  const salesReqBookCount = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === false
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesReqBookCountCancel = (s) => {
    let count = [];
    bookingDetails.forEach((c, i) => {
      if (
        c.general.salesHandleName === s &&
        c.general.isBookingCancelled === true
      ) {
        count.push(c);
      }
    });
    return count;
  };

  const salesYearReqBook = (s) => {
    bookingDetails.forEach((c, i) => {
      month.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setReqBookedData([...month])
    setReqBookedData(month);
    return month;
  };

  const salesReqBookCancelled = (s) => {
    bookingDetails.forEach((c, i) => {
      month3.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            c.general.salesHandleName === s &&
            requestValueYear === moment(c.general.bookedDate).format('YYYY') &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        }
      });
    });
    //  setBookCancelled([...month3])
    setBookCancelled(month3);
    return month3;
  };

  const salesYearReqBookCancelled = (s) => {
    bookingDetails.forEach((c, i) => {
      month3.forEach((m, index) => {
        if (s === 'All') {
          if (
            index === moment(c.general.bookedDate).month() &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        } else {
          if (
            index === moment(c.general.bookedDate).month() &&
            s === moment(c.general.bookedDate).format('YYYY') &&
            requestValue === c.general.salesHandleName &&
            c.general.isBookingCancelled === true
          ) {
            m.val.push(c);
          }
        }
      });
    });
    // setBookCancelled([...month3])
    setBookCancelled(month3);
    return month3;
  };

  const getAmount = (data) => {
    // console.log(`data`, data)
    let value = 0;
    if (data) {
      data.forEach(
        (d, i) => (value = value + parseInt(d.general.bookingValue))
      );
    }
    return value;
  };

  const getMarginAmount = (data) => {
    let value = 0;
    if (data) {
      data.forEach((d) => {
        if (d.general.finalMargin !== '') {
          value = value + parseInt(d.general.finalMargin);
        }
      });
      return value;
    }
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: 'rgba(0, 0, 0, 0)',
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const getExcel = () => {
    const person = [
      'Vikash',
      'Kirthika',
      'Ganesh',
      'Bharathwaaj',
      'Santhosh',
      'Nagasrinivasakumar',
    ];
    let months = [
      {
        name: 'January',
        val: [],
      },
      {
        name: 'Feburary',
        val: [],
      },
      {
        name: 'March',
        val: [],
      },
      {
        name: 'April',
        val: [],
      },
      {
        name: 'May',
        val: [],
      },
      {
        name: 'June',
        val: [],
      },
      {
        name: 'July',
        val: [],
      },
      {
        name: 'August',
        val: [],
      },
      {
        name: 'September',
        val: [],
      },
      {
        name: 'October',
        val: [],
      },
      {
        name: 'November',
        val: [],
      },
      {
        name: 'December',
        val: [],
      },
    ];

    bookingDetails.forEach((c, i) => {
      months.forEach((m, index) => {
        person.forEach((s) => {
          if (
            index === moment(c.general.onwardDate).month() &&
            c.general.salesHandleName === s &&
            exportYear === moment(c.general.onwardDate).format('YYYY') &&
            // marginBookingValueYear ===
            //   moment(c.general.onwardDate).format("YYYY") &&
            c.general.isBookingCancelled === false
          ) {
            m.val.push(c);
          }
        });
      });
    });

    // jan
    const VikashJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniJan = months[0].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllJan = months[0].val;

    // feb
    const VikashFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniFeb = months[1].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllFeb = months[1].val;

    // mar
    const VikashMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniMar = months[2].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllMar = months[2].val;

    // aprl
    const VikashAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniAprl = months[3].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllAprl = months[3].val;

    // may
    const VikashMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniMay = months[4].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllMay = months[4].val;

    // jun
    const VikashJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniJune = months[5].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllJune = months[5].val;

    //  jul
    const VikashJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniJuly = months[6].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllJuly = months[6].val;

    //  aug
    const VikashAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniAug = months[7].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllAug = months[7].val;

    //  sep
    const VikashSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniSep = months[8].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllSep = months[8].val;

    //  oct
    const VikashOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniOct = months[9].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllOct = months[9].val;

    //  nov
    const VikashNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniNov = months[10].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllNov = months[10].val;

    //  dec
    const VikashDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Vikash'
    );
    const KirthikaDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Kirthika'
    );
    const GaneshDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Ganesh'
    );
    const BharathDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Bharathwaaj'
    );
    const SanthoshDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Santhosh'
    );
    const SriniDec = months[11].val.filter(
      (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
    );
    const AllDec = months[11].val;

    let a = [
      {
        name: 'Vikash',
        year: exportYear,
        jan: VikashJan.length === 0 ? 0 : getMarginAmountExcel(VikashJan),
        feb: VikashFeb.length === 0 ? 0 : getMarginAmountExcel(VikashFeb),
        mar: VikashMar.length === 0 ? 0 : getMarginAmountExcel(VikashMar),
        apr: VikashAprl.length === 0 ? 0 : getMarginAmountExcel(VikashAprl),
        may: VikashMay.length === 0 ? 0 : getMarginAmountExcel(VikashMay),
        jun: VikashJune.length === 0 ? 0 : getMarginAmountExcel(VikashJune),
        jul: VikashJuly.length === 0 ? 0 : getMarginAmountExcel(VikashJuly),
        aug: VikashAug.length === 0 ? 0 : getMarginAmountExcel(VikashAug),
        sep: VikashSep.length === 0 ? 0 : getMarginAmountExcel(VikashSep),
        oct: VikashOct.length === 0 ? 0 : getMarginAmountExcel(VikashOct),
        nov: VikashNov.length === 0 ? 0 : getMarginAmountExcel(VikashNov),
        dec: VikashDec.length === 0 ? 0 : getMarginAmountExcel(VikashDec),
      },
      {
        name: 'Kirthika',
        year: exportYear,
        jan: KirthikaJan.length === 0 ? 0 : getMarginAmountExcel(KirthikaJan),
        feb: KirthikaFeb.length === 0 ? 0 : getMarginAmountExcel(KirthikaFeb),
        mar: KirthikaMar.length === 0 ? 0 : getMarginAmountExcel(KirthikaMar),
        apr: KirthikaAprl.length === 0 ? 0 : getMarginAmountExcel(KirthikaAprl),
        may: KirthikaMay.length === 0 ? 0 : getMarginAmountExcel(KirthikaMay),
        jun: KirthikaJune.length === 0 ? 0 : getMarginAmountExcel(KirthikaJune),
        jul: KirthikaJuly.length === 0 ? 0 : getMarginAmountExcel(KirthikaJuly),
        aug: KirthikaAug.length === 0 ? 0 : getMarginAmountExcel(KirthikaAug),
        sep: KirthikaSep.length === 0 ? 0 : getMarginAmountExcel(KirthikaSep),
        oct: KirthikaOct.length === 0 ? 0 : getMarginAmountExcel(KirthikaOct),
        nov: KirthikaNov.length === 0 ? 0 : getMarginAmountExcel(KirthikaNov),
        dec: KirthikaDec.length === 0 ? 0 : getMarginAmountExcel(KirthikaDec),
      },
      {
        name: 'Ganesh',
        year: exportYear,
        jan: GaneshJan.length === 0 ? 0 : getMarginAmountExcel(GaneshJan),
        feb: GaneshFeb.length === 0 ? 0 : getMarginAmountExcel(GaneshFeb),
        mar: GaneshMar.length === 0 ? 0 : getMarginAmountExcel(GaneshMar),
        apr: GaneshAprl.length === 0 ? 0 : getMarginAmountExcel(GaneshAprl),
        may: GaneshMay.length === 0 ? 0 : getMarginAmountExcel(GaneshMay),
        jun: GaneshJune.length === 0 ? 0 : getMarginAmountExcel(GaneshJune),
        jul: GaneshJuly.length === 0 ? 0 : getMarginAmountExcel(GaneshJuly),
        aug: GaneshAug.length === 0 ? 0 : getMarginAmountExcel(GaneshAug),
        sep: GaneshSep.length === 0 ? 0 : getMarginAmountExcel(GaneshSep),
        oct: GaneshOct.length === 0 ? 0 : getMarginAmountExcel(GaneshOct),
        nov: GaneshNov.length === 0 ? 0 : getMarginAmountExcel(GaneshNov),
        dec: GaneshDec.length === 0 ? 0 : getMarginAmountExcel(GaneshDec),
      },
      {
        name: 'Bharathwaaj',
        year: exportYear,
        jan: BharathJan.length === 0 ? 0 : getMarginAmountExcel(BharathJan),
        feb: BharathFeb.length === 0 ? 0 : getMarginAmountExcel(BharathFeb),
        mar: BharathMar.length === 0 ? 0 : getMarginAmountExcel(BharathMar),
        apr: BharathAprl.length === 0 ? 0 : getMarginAmountExcel(BharathAprl),
        may: BharathMay.length === 0 ? 0 : getMarginAmountExcel(BharathMay),
        jun: BharathJune.length === 0 ? 0 : getMarginAmountExcel(BharathJune),
        jul: BharathJuly.length === 0 ? 0 : getMarginAmountExcel(BharathJuly),
        aug: BharathAug.length === 0 ? 0 : getMarginAmountExcel(BharathAug),
        sep: BharathSep.length === 0 ? 0 : getMarginAmountExcel(BharathSep),
        oct: BharathOct.length === 0 ? 0 : getMarginAmountExcel(BharathOct),
        nov: BharathNov.length === 0 ? 0 : getMarginAmountExcel(BharathNov),
        dec: BharathDec.length === 0 ? 0 : getMarginAmountExcel(BharathDec),
      },
      {
        name: 'Santhosh',
        year: exportYear,
        jan: SanthoshJan.length === 0 ? 0 : getMarginAmountExcel(SanthoshJan),
        feb: SanthoshFeb.length === 0 ? 0 : getMarginAmountExcel(SanthoshFeb),
        mar: SanthoshMar.length === 0 ? 0 : getMarginAmountExcel(SanthoshMar),
        apr: SanthoshAprl.length === 0 ? 0 : getMarginAmountExcel(SanthoshAprl),
        may: SanthoshMay.length === 0 ? 0 : getMarginAmountExcel(SanthoshMay),
        jun: SanthoshJune.length === 0 ? 0 : getMarginAmountExcel(SanthoshJune),
        jul: SanthoshJuly.length === 0 ? 0 : getMarginAmountExcel(SanthoshJuly),
        aug: SanthoshAug.length === 0 ? 0 : getMarginAmountExcel(SanthoshAug),
        sep: SanthoshSep.length === 0 ? 0 : getMarginAmountExcel(SanthoshSep),
        oct: SanthoshOct.length === 0 ? 0 : getMarginAmountExcel(SanthoshOct),
        nov: SanthoshNov.length === 0 ? 0 : getMarginAmountExcel(SanthoshNov),
        dec: SanthoshDec.length === 0 ? 0 : getMarginAmountExcel(SanthoshDec),
      },
      {
        name: 'Nagasrinivasakumar',
        year: exportYear,
        jan: SriniJan.length === 0 ? 0 : getMarginAmountExcel(SriniJan),
        feb: SriniFeb.length === 0 ? 0 : getMarginAmountExcel(SriniFeb),
        mar: SriniMar.length === 0 ? 0 : getMarginAmountExcel(SriniMar),
        apr: SriniAprl.length === 0 ? 0 : getMarginAmountExcel(SriniAprl),
        may: SriniMay.length === 0 ? 0 : getMarginAmountExcel(SriniMay),
        jun: SriniJune.length === 0 ? 0 : getMarginAmountExcel(SriniJune),
        jul: SriniJuly.length === 0 ? 0 : getMarginAmountExcel(SriniJuly),
        aug: SriniAug.length === 0 ? 0 : getMarginAmountExcel(SriniAug),
        sep: SriniSep.length === 0 ? 0 : getMarginAmountExcel(SriniSep),
        oct: SriniOct.length === 0 ? 0 : getMarginAmountExcel(SriniOct),
        nov: SriniNov.length === 0 ? 0 : getMarginAmountExcel(SriniNov),
        dec: SriniDec.length === 0 ? 0 : getMarginAmountExcel(SriniDec),
      },
      {
        name: 'All',
        year: exportYear,
        jan: AllJan.length === 0 ? 0 : getMarginAmountExcel(AllJan),
        feb: AllFeb.length === 0 ? 0 : getMarginAmountExcel(AllFeb),
        mar: AllMar.length === 0 ? 0 : getMarginAmountExcel(AllMar),
        apr: AllAprl.length === 0 ? 0 : getMarginAmountExcel(AllAprl),
        may: AllMay.length === 0 ? 0 : getMarginAmountExcel(AllMay),
        jun: AllJune.length === 0 ? 0 : getMarginAmountExcel(AllJune),
        jul: AllJuly.length === 0 ? 0 : getMarginAmountExcel(AllJuly),
        aug: AllAug.length === 0 ? 0 : getMarginAmountExcel(AllAug),
        sep: AllSep.length === 0 ? 0 : getMarginAmountExcel(AllSep),
        oct: AllOct.length === 0 ? 0 : getMarginAmountExcel(AllOct),
        nov: AllNov.length === 0 ? 0 : getMarginAmountExcel(AllNov),
        dec: AllDec.length === 0 ? 0 : getMarginAmountExcel(AllDec),
      },
    ];
    return a;
  };

  const getMarginAmountExcel = (data) => {
    let value = 0;
    if (data) {
      data.forEach((d) => {
        if (d.general.finalMargin !== '') {
          value = value + parseInt(d.general.finalMargin);
        }
      });
      return value;
    }
  };

  // const getExcelSales = () => {
  //   const person = [
  //     'Vikash',
  //     'Kirthika',
  //     'Ganesh',
  //     'Bharathwaaj',
  //     'Santhosh',
  //     'Nagasrinivasakumar',
  //   ];
  //   let months = [
  //     {
  //       name: 'January',
  //       val: [],
  //     },
  //     {
  //       name: 'Feburary',
  //       val: [],
  //     },
  //     {
  //       name: 'March',
  //       val: [],
  //     },
  //     {
  //       name: 'April',
  //       val: [],
  //     },
  //     {
  //       name: 'May',
  //       val: [],
  //     },
  //     {
  //       name: 'June',
  //       val: [],
  //     },
  //     {
  //       name: 'July',
  //       val: [],
  //     },
  //     {
  //       name: 'August',
  //       val: [],
  //     },
  //     {
  //       name: 'September',
  //       val: [],
  //     },
  //     {
  //       name: 'October',
  //       val: [],
  //     },
  //     {
  //       name: 'November',
  //       val: [],
  //     },
  //     {
  //       name: 'December',
  //       val: [],
  //     },
  //   ];

  //   bookingDetails.forEach((c, i) => {
  //     months.forEach((m, index) => {
  //       person.forEach((s) => {
  //         if (
  //           index === moment(c.general.bookedDate).month() &&
  //           c.general.salesHandleName === s &&
  //           exportYearSales === moment(c.general.bookedDate).format('YYYY') &&
  //           // marginBookingValueYear ===
  //           //   moment(c.general.onwardDate).format("YYYY") &&
  //           c.general.isBookingCancelled === false
  //         ) {
  //           m.val.push(c);
  //         }
  //       });
  //     });
  //   });

  //   // jan
  //   const VikashJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniJan = months[0].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllJan = months[0].val;

  //   // feb
  //   const VikashFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniFeb = months[1].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllFeb = months[1].val;

  //   // mar
  //   const VikashMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniMar = months[2].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllMar = months[2].val;

  //   // aprl
  //   const VikashAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniAprl = months[3].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllAprl = months[3].val;

  //   // may
  //   const VikashMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniMay = months[4].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllMay = months[4].val;

  //   // jun
  //   const VikashJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniJune = months[5].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllJune = months[5].val;

  //   //  jul
  //   const VikashJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniJuly = months[6].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllJuly = months[6].val;

  //   //  aug
  //   const VikashAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniAug = months[7].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllAug = months[7].val;

  //   //  sep
  //   const VikashSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniSep = months[8].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllSep = months[8].val;

  //   //  oct
  //   const VikashOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniOct = months[9].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllOct = months[9].val;

  //   //  nov
  //   const VikashNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniNov = months[10].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllNov = months[10].val;

  //   //  dec
  //   const VikashDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Vikash'
  //   );
  //   const KirthikaDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Kirthika'
  //   );
  //   const GaneshDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Ganesh'
  //   );
  //   const BharathDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Bharathwaaj'
  //   );
  //   const SanthoshDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Santhosh'
  //   );
  //   const SriniDec = months[11].val.filter(
  //     (f) => f.general.salesHandleName == 'Nagasrinivasakumar'
  //   );
  //   const AllDec = months[11].val;

  //   let a = [
  //     {
  //       name: 'Vikash',
  //       year: exportYear,
  //       jan: VikashJan.length === 0 ? 0 : getSalesAmountExcel(VikashJan),
  //       feb: VikashFeb.length === 0 ? 0 : getSalesAmountExcel(VikashFeb),
  //       mar: VikashMar.length === 0 ? 0 : getSalesAmountExcel(VikashMar),
  //       apr: VikashAprl.length === 0 ? 0 : getSalesAmountExcel(VikashAprl),
  //       may: VikashMay.length === 0 ? 0 : getSalesAmountExcel(VikashMay),
  //       jun: VikashJune.length === 0 ? 0 : getSalesAmountExcel(VikashJune),
  //       jul: VikashJuly.length === 0 ? 0 : getSalesAmountExcel(VikashJuly),
  //       aug: VikashAug.length === 0 ? 0 : getSalesAmountExcel(VikashAug),
  //       sep: VikashSep.length === 0 ? 0 : getSalesAmountExcel(VikashSep),
  //       oct: VikashOct.length === 0 ? 0 : getSalesAmountExcel(VikashOct),
  //       nov: VikashNov.length === 0 ? 0 : getSalesAmountExcel(VikashNov),
  //       dec: VikashDec.length === 0 ? 0 : getSalesAmountExcel(VikashDec),
  //     },
  //     {
  //       name: 'Kirthika',
  //       year: exportYear,
  //       jan: KirthikaJan.length === 0 ? 0 : getSalesAmountExcel(KirthikaJan),
  //       feb: KirthikaFeb.length === 0 ? 0 : getSalesAmountExcel(KirthikaFeb),
  //       mar: KirthikaMar.length === 0 ? 0 : getSalesAmountExcel(KirthikaMar),
  //       apr: KirthikaAprl.length === 0 ? 0 : getSalesAmountExcel(KirthikaAprl),
  //       may: KirthikaMay.length === 0 ? 0 : getSalesAmountExcel(KirthikaMay),
  //       jun: KirthikaJune.length === 0 ? 0 : getSalesAmountExcel(KirthikaJune),
  //       jul: KirthikaJuly.length === 0 ? 0 : getSalesAmountExcel(KirthikaJuly),
  //       aug: KirthikaAug.length === 0 ? 0 : getSalesAmountExcel(KirthikaAug),
  //       sep: KirthikaSep.length === 0 ? 0 : getSalesAmountExcel(KirthikaSep),
  //       oct: KirthikaOct.length === 0 ? 0 : getSalesAmountExcel(KirthikaOct),
  //       nov: KirthikaNov.length === 0 ? 0 : getSalesAmountExcel(KirthikaNov),
  //       dec: KirthikaDec.length === 0 ? 0 : getSalesAmountExcel(KirthikaDec),
  //     },
  //     {
  //       name: 'Ganesh',
  //       year: exportYear,
  //       jan: GaneshJan.length === 0 ? 0 : getSalesAmountExcel(GaneshJan),
  //       feb: GaneshFeb.length === 0 ? 0 : getSalesAmountExcel(GaneshFeb),
  //       mar: GaneshMar.length === 0 ? 0 : getSalesAmountExcel(GaneshMar),
  //       apr: GaneshAprl.length === 0 ? 0 : getSalesAmountExcel(GaneshAprl),
  //       may: GaneshMay.length === 0 ? 0 : getSalesAmountExcel(GaneshMay),
  //       jun: GaneshJune.length === 0 ? 0 : getSalesAmountExcel(GaneshJune),
  //       jul: GaneshJuly.length === 0 ? 0 : getSalesAmountExcel(GaneshJuly),
  //       aug: GaneshAug.length === 0 ? 0 : getSalesAmountExcel(GaneshAug),
  //       sep: GaneshSep.length === 0 ? 0 : getSalesAmountExcel(GaneshSep),
  //       oct: GaneshOct.length === 0 ? 0 : getSalesAmountExcel(GaneshOct),
  //       nov: GaneshNov.length === 0 ? 0 : getSalesAmountExcel(GaneshNov),
  //       dec: GaneshDec.length === 0 ? 0 : getSalesAmountExcel(GaneshDec),
  //     },
  //     {
  //       name: 'Bharathwaaj',
  //       year: exportYear,
  //       jan: BharathJan.length === 0 ? 0 : getSalesAmountExcel(BharathJan),
  //       feb: BharathFeb.length === 0 ? 0 : getSalesAmountExcel(BharathFeb),
  //       mar: BharathMar.length === 0 ? 0 : getSalesAmountExcel(BharathMar),
  //       apr: BharathAprl.length === 0 ? 0 : getSalesAmountExcel(BharathAprl),
  //       may: BharathMay.length === 0 ? 0 : getSalesAmountExcel(BharathMay),
  //       jun: BharathJune.length === 0 ? 0 : getSalesAmountExcel(BharathJune),
  //       jul: BharathJuly.length === 0 ? 0 : getSalesAmountExcel(BharathJuly),
  //       aug: BharathAug.length === 0 ? 0 : getSalesAmountExcel(BharathAug),
  //       sep: BharathSep.length === 0 ? 0 : getSalesAmountExcel(BharathSep),
  //       oct: BharathOct.length === 0 ? 0 : getSalesAmountExcel(BharathOct),
  //       nov: BharathNov.length === 0 ? 0 : getSalesAmountExcel(BharathNov),
  //       dec: BharathDec.length === 0 ? 0 : getSalesAmountExcel(BharathDec),
  //     },
  //     {
  //       name: 'Santhosh',
  //       year: exportYear,
  //       jan: SanthoshJan.length === 0 ? 0 : getSalesAmountExcel(SanthoshJan),
  //       feb: SanthoshFeb.length === 0 ? 0 : getSalesAmountExcel(SanthoshFeb),
  //       mar: SanthoshMar.length === 0 ? 0 : getSalesAmountExcel(SanthoshMar),
  //       apr: SanthoshAprl.length === 0 ? 0 : getSalesAmountExcel(SanthoshAprl),
  //       may: SanthoshMay.length === 0 ? 0 : getSalesAmountExcel(SanthoshMay),
  //       jun: SanthoshJune.length === 0 ? 0 : getSalesAmountExcel(SanthoshJune),
  //       jul: SanthoshJuly.length === 0 ? 0 : getSalesAmountExcel(SanthoshJuly),
  //       aug: SanthoshAug.length === 0 ? 0 : getSalesAmountExcel(SanthoshAug),
  //       sep: SanthoshSep.length === 0 ? 0 : getSalesAmountExcel(SanthoshSep),
  //       oct: SanthoshOct.length === 0 ? 0 : getSalesAmountExcel(SanthoshOct),
  //       nov: SanthoshNov.length === 0 ? 0 : getSalesAmountExcel(SanthoshNov),
  //       dec: SanthoshDec.length === 0 ? 0 : getSalesAmountExcel(SanthoshDec),
  //     },
  //     {
  //       name: 'Nagasrinivasakumar',
  //       year: exportYear,
  //       jan: SriniJan.length === 0 ? 0 : getSalesAmountExcel(SriniJan),
  //       feb: SriniFeb.length === 0 ? 0 : getSalesAmountExcel(SriniFeb),
  //       mar: SriniMar.length === 0 ? 0 : getSalesAmountExcel(SriniMar),
  //       apr: SriniAprl.length === 0 ? 0 : getSalesAmountExcel(SriniAprl),
  //       may: SriniMay.length === 0 ? 0 : getSalesAmountExcel(SriniMay),
  //       jun: SriniJune.length === 0 ? 0 : getSalesAmountExcel(SriniJune),
  //       jul: SriniJuly.length === 0 ? 0 : getSalesAmountExcel(SriniJuly),
  //       aug: SriniAug.length === 0 ? 0 : getSalesAmountExcel(SriniAug),
  //       sep: SriniSep.length === 0 ? 0 : getSalesAmountExcel(SriniSep),
  //       oct: SriniOct.length === 0 ? 0 : getSalesAmountExcel(SriniOct),
  //       nov: SriniNov.length === 0 ? 0 : getSalesAmountExcel(SriniNov),
  //       dec: SriniDec.length === 0 ? 0 : getSalesAmountExcel(SriniDec),
  //     },
  //     {
  //       name: 'All',
  //       year: exportYear,
  //       jan: AllJan.length === 0 ? 0 : getSalesAmountExcel(AllJan),
  //       feb: AllFeb.length === 0 ? 0 : getSalesAmountExcel(AllFeb),
  //       mar: AllMar.length === 0 ? 0 : getSalesAmountExcel(AllMar),
  //       apr: AllAprl.length === 0 ? 0 : getSalesAmountExcel(AllAprl),
  //       may: AllMay.length === 0 ? 0 : getSalesAmountExcel(AllMay),
  //       jun: AllJune.length === 0 ? 0 : getSalesAmountExcel(AllJune),
  //       jul: AllJuly.length === 0 ? 0 : getSalesAmountExcel(AllJuly),
  //       aug: AllAug.length === 0 ? 0 : getSalesAmountExcel(AllAug),
  //       sep: AllSep.length === 0 ? 0 : getSalesAmountExcel(AllSep),
  //       oct: AllOct.length === 0 ? 0 : getSalesAmountExcel(AllOct),
  //       nov: AllNov.length === 0 ? 0 : getSalesAmountExcel(AllNov),
  //       dec: AllDec.length === 0 ? 0 : getSalesAmountExcel(AllDec),
  //     },
  //   ];
  //   return a;
  // };

  // const getSalesAmountExcel = (data) => {
  //   let value = 0;
  //   if (data) {
  //     data.forEach((d) => {
  //       if (d.general.bookingValue !== '') {
  //         value = value + parseInt(d.general.bookingValue);
  //       }
  //     });
  //     return value;
  //   }
  // };

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <h3 style={{ fontFamily: 'Andika', fontWeight: 'bold' }}>
          Total Sales Report
        </h3>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>No Of Booking Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => salesBookCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>No Of Booking Per Month</h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingState(!showBookingState);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {bookingState ? (
                  <div className='icon-select'>
                    <div>{bookingState}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingState && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowBookingState(!showBookingState);
                          salesBook(name);
                          setBookingState(name);
                          // setBookingStateYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingStateYear(!showBookingStateYear);
                  setShowBookingState(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {bookingStateYear ? (
                  <div className='icon-select'>
                    <div>{bookingStateYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingStateYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYear(y);
                        setShowBookingStateYear(!showBookingStateYear);
                        setBookingStateYear(y);
                        // setBookingState("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'No of booking:',
                    data: bookedData.map((a) => a.val.length),
                    backgroundColor: '#FC766AFF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Sales Volume Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => getAmount(salesBookCount(a))),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Booking Value</h1>
            {/* {exportYearSales.length == 4 ? (
              <>
                <div>
                  <ExcelFile
                    element={
                      <button className='exports'>Export to Excel</button>
                    }>
                    <ExcelSheet data={getExcelSales} name='Queries'>
                      <ExcelColumn label='Name' value='name' />
                      <ExcelColumn label='Year' value='year' />
                      <ExcelColumn label='Jan' value='jan' />
                      <ExcelColumn label='Feb' value='feb' />
                      <ExcelColumn label='Mar' value='mar' />
                      <ExcelColumn label='Aprl' value='apr' />
                      <ExcelColumn label='May' value='may' />
                      <ExcelColumn label='Jun' value='jun' />
                      <ExcelColumn label='Jul' value='jul' />
                      <ExcelColumn label='Aug' value='aug' />
                      <ExcelColumn label='Sep' value='sep' />
                      <ExcelColumn label='Oct' value='oct' />
                      <ExcelColumn label='Nov' value='nov' />
                      <ExcelColumn label='Dec' value='dec' />
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h6 style={{ paddingRight: '10px' }}>Enter year to export</h6>
                <input
                  type='number'
                  min='1'
                  max='999'
                  placeholder='2021'
                  onChange={(e) => setExportYearSales(e.target.value)}
                />
              </div>
            )} */}

            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingValue(!showBookingValue);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValueYear(false);
                  setShowMarginBookingValue(false);
                }}>
                {bookingValue ? (
                  <div className='icon-select'>
                    <div>{bookingValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowBookingValue(!showBookingValue);
                          salesBookValue(name);
                          setBookingValue(name);
                          // setBookingValueYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowBookingValueYear(!showBookingValueYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValueYear(false);
                  setShowMarginBookingValue(false);
                }}>
                {bookingValueYear ? (
                  <div className='icon-select'>
                    <div>{bookingValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showBookingValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYearBookValue(y);
                        setShowBookingValueYear(!showBookingValueYear);
                        setBookingValueYear(y);
                        // setBookingValue("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'Total Booking Value :',

                    data: bookedValueData.map((b) => getAmount(b?.val)),
                    backgroundColor: '#101820FF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>
              No Of Travellers Per Person
            </h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => salesTravelCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>
              No Of Travellers Per Month
            </h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowTravelState(!showTravelState);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {travelState ? (
                  <div className='icon-select'>
                    <div>{travelState}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showTravelState && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowTravelState(!showTravelState);
                          salesTravelValue(name);
                          setTravelState(name);
                          // setTravelStateYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowTravelStateYear(!showTravelStateYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {travelStateYear ? (
                  <div className='icon-select'>
                    <div>{travelStateYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showTravelStateYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        salesYearTravelValue(y);
                        setShowTravelStateYear(!showTravelStateYear);
                        setTravelStateYear(y);
                        // setTravelState("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'No of Travellers : ',
                    data: onwardData.map((a) => a.val.length),
                    backgroundColor: '#FEE715FF',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Margin Volume Per Person</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of booking',
                    data: empNames
                      .slice(1)
                      .map((a) => getMarginAmount(salesBookCount(a))),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Margin Value</h1>

            {exportYear.length == 4 ? (
              <>
                <div>
                  <ExcelFile
                    element={
                      <button className='exports'>Export to Excel</button>
                    }>
                    <ExcelSheet data={getExcel} name='Queries'>
                      <ExcelColumn label='Name' value='name' />
                      <ExcelColumn label='Year' value='year' />
                      <ExcelColumn label='Jan' value='jan' />
                      <ExcelColumn label='Feb' value='feb' />
                      <ExcelColumn label='Mar' value='mar' />
                      <ExcelColumn label='Aprl' value='apr' />
                      <ExcelColumn label='May' value='may' />
                      <ExcelColumn label='Jun' value='jun' />
                      <ExcelColumn label='Jul' value='jul' />
                      <ExcelColumn label='Aug' value='aug' />
                      <ExcelColumn label='Sep' value='sep' />
                      <ExcelColumn label='Oct' value='oct' />
                      <ExcelColumn label='Nov' value='nov' />
                      <ExcelColumn label='Dec' value='dec' />
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h6 style={{ paddingRight: '10px' }}>Enter year to export</h6>
                <input
                  type='number'
                  min='1'
                  max='999'
                  placeholder='2021'
                  onChange={(e) => setExportYear(e.target.value)}
                />
              </div>
            )}

            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowMarginBookingValue(!showMarginBookingValue);
                  setShowMarginBookingValueYear(false);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                }}>
                {marginBookingValue ? (
                  <div className='icon-select'>
                    <div>{marginBookingValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showMarginBookingValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setShowMarginBookingValue(!showMarginBookingValue);
                          salesMarginBookValue(name);
                          setMarginBookingValue(name);
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowMarginBookingValueYear(!showMarginBookingValueYear);
                  setShowMarginBookingValue(false);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowRequestValueYear(false);
                }}>
                {marginBookingValueYear ? (
                  <div className='icon-select'>
                    <div>{marginBookingValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showMarginBookingValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setShowMarginBookingValueYear(
                          !showMarginBookingValueYear
                        );
                        salesYearMarginBookValue(y);
                        setMarginBookingValueYear(y);
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  {
                    label: 'Total Margin Value :',

                    data: bookedMarginValueData.map((b) =>
                      getMarginAmount(b?.val)
                    ),
                    backgroundColor: '#6A1B4D',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
      <div className='booking__count-container'>
        <div className='booking__count-doughnut'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Sales Volume Comparison</h1>
          </div>
          <div className='pie--chart'>
            <Pie
              data={{
                labels: empNames.slice(1),
                datasets: [
                  {
                    label: 'No of Request',
                    data: empNames.slice(1).map((a) => salesReqCount(a).length),
                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                  {
                    label: 'No of booking ',
                    data: empNames
                      .slice(1)
                      .map((a) => salesReqBookCount(a).length),

                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#50DBB4',
                      '#FC766AF',
                      '#3DBE29',
                    ],
                  },
                  {
                    label: 'No of booking cancelled ',
                    data: empNames
                      .slice(1)
                      .map((a) => salesReqBookCountCancel(a).length),

                    backgroundColor: [
                      '#ffa600',
                      '#003f5c',
                      '#bc5090',
                      '#f7f7f7',
                      '#50DBB4',
                    ],
                  },
                ],
              }}
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className='booking__count-bar'>
          <div className='booking--header'>
            <h1 className='booking__count--header'>Comparisons</h1>
            <div className='month'>
              <label>Show For</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowRequestValue(!showRequestValue);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValueYear(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {requestValue ? (
                  <div className='icon-select'>
                    <div>{requestValue}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showRequestValue && (
                <div className='select_option'>
                  {empNames.map((name, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          // salesRequestValue(name)
                          salesReqBook(name);
                          salesReqBookCancelled(name);
                          setShowRequestValue(!showRequestValue);
                          setRequestValue(name);
                          // setRequestValueYear("All")
                        }}>
                        {name}
                      </li>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='month'>
              <label>Year</label>
              <div
                className='bookState'
                onClick={() => {
                  setShowRequestValueYear(!showRequestValueYear);
                  setShowBookingState(false);
                  setShowBookingStateYear(false);
                  setShowBookingValue(false);
                  setShowBookingValueYear(false);
                  setShowTravelState(false);
                  setShowTravelStateYear(false);
                  setShowRequestValue(false);
                  setShowMarginBookingValue(false);
                  setShowMarginBookingValueYear(false);
                }}>
                {requestValueYear ? (
                  <div className='icon-select'>
                    <div>{requestValueYear}</div>
                    <IoIosArrowDown />
                  </div>
                ) : (
                  <div className='icon-select'>
                    <div>All</div>
                    <IoIosArrowDown />
                  </div>
                )}
              </div>
              {showRequestValueYear && (
                <div className='select_optionn'>
                  {years.map((y, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        // salesYearRequestValue(y)
                        salesYearReqBook(y);
                        salesYearReqBookCancelled(y);
                        setShowRequestValueYear(!showRequestValueYear);
                        setRequestValueYear(y);
                        // setRequestValue("All")
                      }}>
                      {y}
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='bar--chart'>
            <Bar
              data={{
                labels: months,
                datasets: [
                  // {
                  //   label: "Total Request Value :",
                  //   data: reqData.map((a) => a.val.length),
                  //   backgroundColor: "#6CE5E8",
                  // },
                  {
                    label: 'Total Booking Value :',
                    data: reqBookedData.map((a) => a.val.length),
                    backgroundColor: '#41B8D5',
                  },
                  {
                    label: 'Total Booking Cancelled :',
                    data: bookCancelled.map((a) => a.val.length),
                    backgroundColor: '#2D8BBA',
                  },
                ],
              }}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSaleReport;
