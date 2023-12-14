import React, { useState, useEffect, useContext, useRef } from 'react';
import Profilenav from './Profilenav';
import './Support.css';
import logo from '../assests/logo1.jpeg';
import Profilepage from './Profilepage';
import { Table, Form, Input, Button } from 'reactstrap';
import { firedb } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import * as BiIcons from 'react-icons/bi';
import { isAuthenticated } from '../Login components/auth';
import { ApiContext } from '../Context/ApiContext';

const Support = () => {
  const isMounted = useRef(false);
  const { addToast } = useToasts();
  const { user } = isAuthenticated();
  const [queries, setQueries] = useState([]);
  const [values, setValues] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    queryType: '',
    comments: '',
  });
  const { employees } = useContext(ApiContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitQueryData = (e) => {
    e.preventDefault();
    firedb
      .ref(`supportQueries`)
      .push(values)
      .then((data) => {
        addToast('Submitted Successfully', {
          appearance: 'success',
        });

        setValues({
          name: '',
          email: '',
          mobileNumber: '',
          queryType: '',
          comments: '',
        });
      })
      .catch((err) => console.log('err :>> ', err));
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth < 900) {
      setClicked(true);
    }
  }, [innerWidth]);

  const getSubmittedQueries = () => {
    firedb.ref('supportQueries').on('value', (data) => {
      if (isMounted.current) {
        if (data) {
          let req = [];
          data.forEach((d) => {
            req.push(d.val());
          });
          setQueries(req);
        }
      }
    });
  };

  useEffect(() => {
    isMounted.current = true;
    getSubmittedQueries();
    return () => (isMounted.current = false);
  }, []);

  const isAdmin = (email) => {
    const loggedUser = employees?.filter((e) => e.email === email);
    if (loggedUser.length === 0) return false;
    return loggedUser[0].isAdmin;
  };

  let pageSize = 7;
  // let pagesCount = Math.ceil(queries.length / pageSize);

  // const handleClick = (e, index) => {
  //   e.preventDefault();
  //   setCurrentpage(index);
  // };

  const [clicked, setClicked] = useState(false);
  const toggleSidebar = () => {
    setClicked(!clicked);
  };
  const { name, email, queryType, comments, mobileNumber } = values;
  const currentPage = 0;
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className={clicked ? 'toggleSidebar' : 'toggleSideba'}>
          <Profilepage />
        </div>
        <div className='support-container'>
          <BiIcons.BiMenuAltRight
            onClick={toggleSidebar}
            size={50}
            color='white'
            style={{
              zIndex: 20,
              position: 'absolute',
              paddingLeft: 20,
              marginRight: 20,
              top: 18,
              cursor: 'pointer',
            }}
          />
          <div className='support-section'>
            <Profilenav title={'Support'} />
          </div>
          <div className='support-section-form'>
            <div className='support-section-form2'>
              <div className='support-section-from2-head'>
                <h3>Contact us</h3>
              </div>
              <div className='support-section-form2-info'>
                <Form>
                  <div className='form-group'>
                    <label className='user-label'>Name</label>
                    <input
                      type='text'
                      value={name}
                      name='name'
                      onChange={handleChange}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='user-label'>Email</label>
                    <input
                      type='text'
                      onChange={handleChange}
                      value={email}
                      name='email'
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='user-label'>Mobile no</label>
                    <input
                      type='text'
                      onChange={handleChange}
                      value={mobileNumber}
                      name='mobileNumber'
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='form-group'>
                    <label className='user-label'>Choose the type</label>
                    <Input
                      type='select'
                      onChange={handleChange}
                      name='queryType'
                      value={queryType}
                      className='user-input-alter user-input'>
                      <option value='Payment'>Payment</option>
                      <option value='Tour plans and estimates'>
                        Tour plans and estimates
                      </option>
                      <option value='Destination information'>
                        Destination information
                      </option>
                      <option value='Others'>Others</option>
                    </Input>
                  </div>
                  <div className='form-group'>
                    <label className='user-label'>Comment</label>
                    <Input
                      type='textarea'
                      rows='5'
                      onChange={handleChange}
                      name='comments'
                      value={comments}
                      className='user-input-alter user-input'
                    />
                  </div>
                  <div className='user-button'>
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={submitQueryData}>
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div className='support-section-form1'>
              <div className='reach-section'>
                <h1>Reach us</h1>
              </div>
              <div className='reach-section-img'>
                <img src={logo} alt='' />
              </div>
              <div className='reach-section-contact'>
                <h2>Email : touronholidayz@gmail.com</h2>
                <h2>Mobile no : 8667801206</h2>
                <Button color='success' type='button' style={{ marginTop: 20 }}>
                  Chat with us!
                </Button>
              </div>
            </div>
          </div>

          {isAdmin(user.email) ? (
            <div className='support-queries-container'>
              <h1>Submitted Queries</h1>
              <div className='requests-table support'>
                <Table hover bordered>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Email</th>
                      <th scope='col'>Mobile Number</th>
                      <th scope='col'>Query Type</th>
                      <th scope='col'>Comments</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white'>
                    {queries.length !== 0 ? (
                      <>
                        {queries
                          .slice(
                            currentPage * pageSize,
                            (currentPage + 1) * pageSize
                          )
                          .map((q, i) => (
                            <tr key={i}>
                              <td>{q.name}</td>
                              <td>{q.email}</td>
                              <td>{q.mobileNumber}</td>
                              <td>{q.queryType}</td>
                              <td>{q.comments}</td>
                            </tr>
                          ))}
                      </>
                    ) : (
                      <div className='noFindQueries'>No Queries found</div>
                    )}
                  </tbody>
                </Table>
              </div>
              {/* <div>
                <Pagination
                  className="pagination justify-content-end"
                  listClassName="justify-content-end"
                >
                  <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink
                      onClick={(e) => handleClick(e, currentPage - 1)}
                      previous
                      href="#"
                    />
                  </PaginationItem>
                  {[...Array(pagesCount)].map((page, i) => (
                    <PaginationItem active={i === currentPage} key={i}>
                      <PaginationLink
                        onClick={(e) => handleClick(e, i)}
                        href="#"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= pagesCount - 1}>
                    <PaginationLink
                      onClick={(e) => handleClick(e, currentPage + 1)}
                      next
                      href="#"
                    />
                  </PaginationItem>
                </Pagination>
              </div> */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Support;
