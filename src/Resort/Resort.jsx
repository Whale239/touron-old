import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Resort.css';
import { firedb, fireStorage } from '../firebase';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../backend';
import { Progress } from 'reactstrap';

const Resort = () => {
  const { resortid } = useParams();
  const { addToast } = useToasts();
  const [resortDetails, setResortDetails] = useState({
    countryName: '',
    cityName: '',
    resortName: '',
    resortCategory: [],
    ratings: '',
    resortImages: [],
    resortFeatures: [],
    cost: '',
    stayFrom: '',
    stayTill: '',
    loveMeter: '',
    resortAwards: [],
    restaurants: [],
    resortRules: {
      checkIn: '',
      checkOut: '',
    },
    offerPercent: '',
    paymentLink: '',
    priority: '',
  });
  const [honeymoonBenefits, setHoneymoonBenefits] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [overview, setOverview] = useState('');
  const [inclusion, setInclusion] = useState('');
  const [finePrint, setFinePrint] = useState('');
  const [file, setFile] = useState('');
  const [country, setCountries] = useState([]);
  const [city, setCity] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showOfferCost, setShowOfferCost] = useState(false);
  const [showMealPlan, setShowMealPlan] = useState(false);
  const [showTransferType, setShowTransferType] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const mealPlans = [
    'Breakfast Only',
    'Breakfast & Dinner ',
    'Breakfast, Lunch & Dinner',
    'All Inclusive ',
  ];
  const transferTypes = [
    'Speedboat',
    'Sea Plane ',
    'Domestic Flight + Speedboat',
  ];

  const rating = ['3', '4', '5', 'Premium'];

  const { checkIn, checkOut } = resortDetails.resortRules;

  const {
    countryName,
    cityName,
    resortName,
    resortCategory,
    ratings,
    resortImages,
    resortFeatures,
    cost,
    loveMeter,
    stayFrom,
    stayTill,
    resortAwards,
    restaurants,
    resortRules,
    offerPercent,
    paymentLink,
    priority,
  } = resortDetails;

  const [singleRestaurantCategory, setSingleRestaurantCategory] = useState({
    categoryName: '',
    days: '',
    image: '',
    mealPlan: '',
    transferType: '',
  });

  const { categoryName, days, image, mealPlan, transferType } =
    singleRestaurantCategory;

  const [singleResortImage, setSingleResortImage] = useState('');

  const [singleResortAward, setSingleResortAward] = useState('');

  const [singleRestaurant, setSingleRestaurant] = useState({
    name: '',
    cuisine: '',
    openFor: '',
    menu: '',
  });

  const { name, cuisine, openFor, menu } = singleRestaurant;

  const addResortCategory = () => {
    let cat = [];
    if (resortCategory) {
      cat = [...resortCategory, singleRestaurantCategory];
    } else {
      cat = [singleRestaurantCategory];
    }
    setResortDetails({
      ...resortDetails,
      resortCategory: cat,
    });
    setSingleRestaurantCategory({
      categoryName: '',
      days: '',
      image: '',
      mealPlan: '',
      transferType: '',
    });
  };

  const addResortImage = () => {
    let image = [];
    if (resortImages) {
      image = [...resortImages, singleResortImage];
    } else {
      image = [singleResortImage];
    }
    setResortDetails({
      ...resortDetails,
      resortImages: image,
    });
    setSingleResortImage('');
  };

  const addResortAward = () => {
    let image = [];
    if (resortAwards) {
      image = [...resortAwards, singleResortAward];
    } else {
      image = [singleResortAward];
    }
    setResortDetails({
      ...resortDetails,
      resortAwards: image,
    });
    setSingleResortAward('');
  };

  const addRestaurant = () => {
    let rest = [];
    if (restaurants) {
      rest = [...restaurants, singleRestaurant];
    } else {
      rest = [singleRestaurant];
    }
    setResortDetails({
      ...resortDetails,
      restaurants: rest,
    });
    setSingleRestaurant({
      name: '',
      cuisine: '',
      openFor: '',
      menu: '',
    });
  };

  const features = [
    'Beachfront',
    'Private Beach Area',
    'Garden',
    'Bar',
    'Restaurant',
    'Live Music',
    'Movie Nights',
    'Tennis',
    'Water Sports',
    'Snorkling',
    'Diving',
    'Canoeing',
    'Billiards',
    'Fishing',
    'House Keeping',
    'Laundry',
    'Massage',
    'Hot Tub',
    'Gym',
    'Security',
    'Steam Room',
    'Swimming Pool',
    'Umbrella',
    'Snack Bar',
    'Shops',
    'Saloon',
    'Newspaper',
    'Luggage Storage',
    'Currency Exchange',
    'Kids Play Area',
    'Baby Sitting',
    'Outdoor Furniture',
    'Terrace',
    'Cycling',
  ];

  const manageFeature = (feas) => {
    if (resortFeatures.includes(feas)) {
      const filterFea = resortFeatures.filter((f) => f !== feas);
      setResortDetails({
        ...resortDetails,
        resortFeatures: filterFea,
      });
    } else {
      setResortDetails({
        ...resortDetails,
        resortFeatures: [...resortFeatures, feas],
      });
    }
  };

  const delResortCat = (i) => {
    const filterResortCat = resortCategory.filter((r, index) => index !== i);
    setResortDetails({
      ...resortDetails,
      resortCategory: filterResortCat,
    });
  };

  const delResortImg = (i) => {
    const filterResortImg = resortImages.filter((r, index) => index !== i);
    setResortDetails({
      ...resortDetails,
      resortImages: filterResortImg,
    });
  };

  const delResortAwdImg = (i) => {
    const filterResortAwdImg = resortAwards.filter((r, index) => index !== i);
    setResortDetails({
      ...resortDetails,
      resortAwards: filterResortAwdImg,
    });
  };

  const delRestaurant = (i) => {
    const filterRestaurant = restaurants.filter((r, index) => index !== i);
    setResortDetails({
      ...resortDetails,
      restaurants: filterRestaurant,
    });
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    // console.log(`file`, file);

    const ref = fireStorage.ref(`resorts/${file.name}`);
    // console.log(`ref`, ref);
    const task = ref.put(file);

    task.on('state_changed', (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;

      // console.log("per", per);
      setProgress(Math.round(per));
    });

    task.then(() => {
      ref.getDownloadURL().then((url) => {
        // console.log(`url`, url);
        setFile(url);
      });
    });
    try {
      setImageUploaded(true);
      await task.then(() => {
        setImageUploaded(false);
        setProgress(0);
      });
    } catch (E) {
      console.log(E);
    }
  };

  const submitResort = () => {
    firedb
      .ref(`resorts`)
      .push({
        countryName: countryName,
        cityName: cityName,
        resortName: resortName,
        ratings: ratings,
        resortCategory: resortCategory.length === 0 ? '' : resortCategory,
        resortImages: resortImages.length === 0 ? '' : resortImages,
        resortFeatures: resortFeatures.length === 0 ? '' : resortFeatures,
        restaurants: restaurants.length === 0 ? '' : restaurants,
        resortAwards: resortAwards.length === 0 ? '' : resortAwards,

        overview: overview,
        inclusion: inclusion,
        cost: cost,
        loveMeter: loveMeter,
        stayFrom: stayFrom,
        stayTill: stayTill,
        priority: priority,

        resortRules: {
          checkIn: checkIn,
          checkOut: checkOut,
          honeymoonBenefits: honeymoonBenefits,
          cancellationPolicy: cancellationPolicy,
        },
        finePrint: finePrint,
        offerPercent: offerPercent,
        paymentLink: paymentLink,
        file: file,
      })
      .then(() => {
        addToast('Added Successfully', {
          appearance: 'success',
        });
        setResortDetails({
          countryName: '',
          cityName: '',
          resortName: '',
          resortCategory: [],
          ratings: '',
          resortImages: [],
          stayFrom: '',
          stayTill: '',
          priority: '',
          resortFeatures: [],
          cost: '',
          loveMeter: '',
          resortAwards: [],
          restaurants: [],
          resortRules: {
            checkIn: '',
            checkOut: '',
          },
          offerPercent: '',
          paymentLink: '',
        });
        setHoneymoonBenefits('');
        setCancellationPolicy('');
        setOverview('');
        setInclusion('');
        setFinePrint('');
        setFile('');
      })
      .catch((err) => console.log(err));
  };

  const getResort = () => {
    if (resortid) {
      firedb.ref(`resorts/${resortid}`).on('value', (data) => {
        const {
          cityName,
          countryName,
          cost,
          finePrint,
          inclusion,
          loveMeter,
          overview,
          stayFrom,
          stayTill,
          priority,
          ratings,
          resortAwards,
          resortCategory,
          resortFeatures,
          resortImages,
          resortName,
          resortRules,
          restaurants,
          offerPercent,
          paymentLink,
          file,
        } = data.val();
        setResortDetails({
          countryName: countryName,
          resortCategory: resortCategory === '' ? [] : resortCategory,
          resortImages: resortImages === '' ? [] : resortImages,
          resortFeatures: resortFeatures === '' ? [] : resortFeatures,
          restaurants: restaurants === '' ? [] : restaurants,
          resortAwards: resortAwards === '' ? [] : resortAwards,
          cityName: cityName,
          resortName: resortName,
          ratings: ratings,
          cost: cost,
          loveMeter: loveMeter,
          stayFrom: stayFrom,
          stayTill: stayTill,
          priority: priority,
          resortRules: {
            checkIn: resortRules.checkIn,
            checkOut: resortRules.checkOut,
          },
          offerPercent: offerPercent,
          paymentLink: paymentLink,
        });
        setHoneymoonBenefits(resortRules.honeymoonBenefits);
        setCancellationPolicy(resortRules.cancellationPolicy);
        setOverview(overview);
        setInclusion(inclusion);
        setFinePrint(finePrint);
        setFile(file);
      });
    }
  };

  const updateResort = () => {
    firedb
      .ref(`resorts/${resortid}`)
      .update({
        resortCategory: resortCategory.length === 0 ? '' : resortCategory,
        resortImages: resortImages.length === 0 ? '' : resortImages,
        resortFeatures: resortFeatures.length === 0 ? '' : resortFeatures,
        restaurants: restaurants.length === 0 ? '' : restaurants,
        resortAwards: resortAwards.length === 0 ? '' : resortAwards,

        countryName: countryName,
        cityName: cityName,
        resortName: resortName,
        ratings: ratings,
        stayFrom: stayFrom,
        stayTill: stayTill,
        priority: priority,
        overview: overview,
        inclusion: inclusion,
        cost: cost,
        loveMeter: loveMeter,
        resortRules: {
          checkIn: checkIn,
          checkOut: checkOut,
          honeymoonBenefits: honeymoonBenefits,
          cancellationPolicy: cancellationPolicy,
        },
        finePrint: finePrint,
        offerPercent: offerPercent,
        paymentLink: paymentLink,
        file: file,
      })
      .then(() => {
        addToast('Update Successfully', {
          appearance: 'success',
        });
        setResortDetails({
          countryName: '',
          cityName: '',
          resortName: '',
          resortCategory: [],
          ratings: '',
          resortImages: [],
          stayFrom: '',
          stayTill: '',
          priority: '',
          resortFeatures: [],
          cost: '',
          loveMeter: '',
          resortAwards: [],
          restaurants: [],
          resortRules: {
            checkIn: '',
            checkOut: '',
          },
          offerPercent: '',
          paymentLink: '',
        });
        setHoneymoonBenefits('');
        setCancellationPolicy('');
        setOverview('');
        setInclusion('');
        setFinePrint('');
        setFile('');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getResort();
  }, []);

  const getCountries = async () => {
    try {
      const countryResponse = await axios.get(`${API}/country`);
      setCountries(countryResponse.data);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const getCities = async (countryName) => {
    try {
      const cityResponse = await axios.get(
        `${API}/city/countryname/${countryName}`
      );
      setCity(cityResponse.data);
    } catch (err) {
      console.log(err, 'err');
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getCities(countryName);
  }, [countryName]);

  const offerCost = [
    {
      month: 'January',
      amt: '1',
    },
    {
      month: 'February',
      amt: '2',
    },
    {
      month: 'March',
      amt: '3',
    },
    {
      month: 'April',
      amt: '4',
    },
    {
      month: 'May',
      amt: '5',
    },
    {
      month: 'June',
      amt: '6',
    },
    {
      month: 'July',
      amt: '7',
    },
    {
      month: 'August',
      amt: '8',
    },
    {
      month: 'September',
      amt: '9',
    },
    {
      month: 'October',
      amt: '10',
    },
    {
      month: 'November',
      amt: '11',
    },
    {
      month: 'December',
      amt: '12',
    },
  ];

  console.log('offerCost', offerCost);

  return (
    <div className='resortMain'>
      <div className='resortHead'>
        <h1>Resort Details</h1>
      </div>
      <div className='resortForm'>
        <div className='resortField'>
          <label>Country Name</label>
          <div className='inputtt' onClick={() => setShowCountry(!showCountry)}>
            {countryName ? <>{countryName}</> : <>Select Country </>}
          </div>
          {showCountry && (
            <div className='inputc'>
              {country.map((c, i) => {
                return (
                  <div key={i}>
                    <li
                      onClick={() => {
                        setResortDetails({
                          ...resortDetails,
                          countryName: c.countryName,
                          cityName: '',
                        });
                        setShowCountry(false);
                      }}>
                      {c.countryName}
                    </li>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className='resortField'>
          <label>City Name</label>
          <div className='inputtt' onClick={() => setShowCity(!showCity)}>
            {cityName ? <>{cityName}</> : <>Select City </>}
          </div>
          {showCity && countryName && (
            <div className='inputcc'>
              {city.map((c, i) => {
                return (
                  <div key={i}>
                    <li
                      onClick={() => {
                        setResortDetails({
                          ...resortDetails,
                          cityName: c.cityName,
                        });
                        setShowCity(false);
                      }}>
                      {c.cityName}
                    </li>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className='resortField'>
          <label>Resort Name</label>
          <input
            type='text'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                resortName: e.target.value,
              })
            }
            value={resortName}
          />
        </div>
        <div className='resortField'>
          <label>High Priority</label>
          <input
            type='number'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                priority: e.target.value,
              })
            }
            value={priority}
          />
        </div>
        <div className='resortField'>
          <label>Ratings</label>
          <div className='inputtt' onClick={() => setShowRating(!showRating)}>
            {ratings ? <>{ratings}</> : <>Select Rating </>}
          </div>
          {showRating && (
            <div className='inputcc'>
              {rating.map((r, i) => {
                return (
                  <div key={i}>
                    <li
                      onClick={() => {
                        setResortDetails({
                          ...resortDetails,
                          ratings: r,
                        });
                        setShowRating(false);
                      }}>
                      {r}
                    </li>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className='resortField'>
          <label>Offer Cost</label>
          <input
            type='number'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                cost: e.target.value,
              })
            }
            value={cost}
          />
          {/* <div
            className="inputtt"
            onClick={() => setShowOfferCost(!showOfferCost)}
          >
            {cost ? <>{cost}</> : <>Select Month </>}
          </div>
          {showOfferCost && (
            <div className="inputcccc">
              {offerCost.map((c, i) => {
                console.log("c", c)
                return (
                  <div key={i}>
                    <li
                      onClick={() => {
                        setResortDetails({
                          ...resortDetails,
                          cost: c.amt,
                        })
                        setShowOfferCost(false)
                      }}
                    >
                      {c.month}
                    </li>
                  </div>
                )
              })}
            </div>
          )} */}
        </div>

        <div className='resortField'>
          <label>Stay valid from</label>
          <input
            type='date'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                stayFrom: e.target.value,
              })
            }
            value={stayFrom}
          />
        </div>
        <div className='resortField'>
          <label>Stay valid till</label>
          <input
            type='date'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                stayTill: e.target.value,
              })
            }
            value={stayTill}
          />
        </div>
        <div className='resortField'>
          <label>Love Meter</label>
          <input
            type='text'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                loveMeter: e.target.value,
              })
            }
            value={loveMeter}
          />
        </div>
        <div className='resortField'>
          <label>Actual Cost</label>
          <input
            type='text'
            onChange={(e) =>
              setResortDetails({
                ...resortDetails,
                offerPercent: e.target.value,
              })
            }
            value={offerPercent}
          />
        </div>

        <div className='resorttField'>
          <label>Overview</label>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={overview}
              onChange={(event, editor) => {
                const data = editor.getData();
                setOverview(data);
              }}
            />
          </div>
        </div>
        <div className='resorttField'>
          <label>Inclusion</label>
          <CKEditor
            editor={ClassicEditor}
            data={inclusion}
            onChange={(event, editor) => {
              const data = editor.getData();
              setInclusion(data);
            }}
          />
        </div>
        <div className='resorttField'>
          <label>Fine Print</label>
          <CKEditor
            editor={ClassicEditor}
            data={finePrint}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFinePrint(data);
            }}
          />
        </div>
        <div className='resorttField'>
          <label>Resort Features</label>
          <div className='resortFea'>
            {features.map((f, i) => {
              return (
                <div className='subResortFieldd' key={i}>
                  <h6>{f}</h6>
                  <input
                    type='checkbox'
                    checked={resortFeatures.includes(f) ? true : false}
                    onChange={() => manageFeature(f)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='resortForm1'>
        <div className='resortttField'>
          <div className='resortInclude'>
            <label>Resort Category</label>
            {categoryName && days && image && mealPlan && transferType && (
              <div className='addResortCategoryBtn' onClick={addResortCategory}>
                Add
              </div>
            )}
          </div>
          <div className='subResortField'>
            <h6>Villa Name</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurantCategory({
                  ...singleRestaurantCategory,
                  categoryName: e.target.value,
                })
              }
              value={categoryName}
            />
          </div>
          <div className='subResortField'>
            <h6>No of Nights</h6>
            <input
              type='number'
              onChange={(e) =>
                setSingleRestaurantCategory({
                  ...singleRestaurantCategory,
                  days: e.target.value,
                })
              }
              value={days}
            />
          </div>
          <div className='subResortField'>
            <h6>Image</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurantCategory({
                  ...singleRestaurantCategory,
                  image: e.target.value,
                })
              }
              value={image}
            />
          </div>
          <div className='subResortField'>
            <h6>Meal Plan</h6>
            <div
              className='inputttt'
              onClick={() => setShowMealPlan(!showMealPlan)}>
              {mealPlan ? <>{mealPlan}</> : <>Select</>}
            </div>
            {showMealPlan && (
              <div className='inputccc'>
                {mealPlans.map((m, i) => {
                  return (
                    <div key={i}>
                      <li
                        onClick={() => {
                          setSingleRestaurantCategory({
                            ...singleRestaurantCategory,
                            mealPlan: m,
                          });
                          setShowMealPlan(false);
                        }}>
                        {m}
                      </li>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className='subResortField'>
            <h6>Transfer type</h6>
            <div
              className='inputttt'
              onClick={() => setShowTransferType(!showTransferType)}>
              {transferType ? <>{transferType}</> : <>Select</>}
            </div>
            {showTransferType && (
              <div className='inputccc'>
                {transferTypes.map((t, i) => {
                  return (
                    <div key={i}>
                      <li
                        onClick={() => {
                          setSingleRestaurantCategory({
                            ...singleRestaurantCategory,
                            transferType: t,
                          });
                          setShowTransferType(false);
                        }}>
                        {t}
                      </li>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {resortCategory && (
          <div className='resortShow'>
            {resortCategory.map((r, i) => {
              return (
                <div>
                  <div key={i} className='resortShowS'>
                    <h6>
                      Villa Name: <span> </span> {r.categoryName}
                    </h6>
                    <h6>
                      No of Nights: <span> </span> {r.days}
                    </h6>
                    <h6>
                      Meal Plan: <span> </span> {r.mealPlan}
                    </h6>
                    <h6>
                      Transfer Type: <span> </span> {r.transferType}
                    </h6>
                    <img src={r.image} alt='' />
                  </div>
                  <div className='removv' onClick={() => delResortCat(i)}>
                    remove
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='resortForm1'>
        <div className='resortttField'>
          <div className='resortInclude'>
            <label>Resort Image</label>
            {singleResortImage && (
              <div className='addResortCategoryBtn' onClick={addResortImage}>
                Add
              </div>
            )}
          </div>
          <input
            type='text'
            onChange={(e) => setSingleResortImage(e.target.value)}
            value={singleResortImage}
          />
        </div>
        {resortImages && (
          <div className='resortShow'>
            {resortImages.map((r, i) => {
              return (
                <div>
                  <div key={i} className='resortShowS'>
                    <img src={r} alt='' />
                  </div>
                  <div className='removv' onClick={() => delResortImg(i)}>
                    remove
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='resortForm1'>
        <div className='resortttField'>
          <div className='resortInclude'>
            <label>Resort Award Image</label>
            {singleResortAward && (
              <div className='addResortCategoryBtn' onClick={addResortAward}>
                Add
              </div>
            )}
          </div>
          <input
            type='text'
            onChange={(e) => setSingleResortAward(e.target.value)}
            value={singleResortAward}
          />
        </div>
        {resortAwards.length > 0 && (
          <div className='resortShow'>
            {resortAwards?.map((r, i) => {
              return (
                <div>
                  <div key={i} className='resortShowS'>
                    <img src={r} alt='' />
                  </div>
                  <div className='removv' onClick={() => delResortAwdImg(i)}>
                    remove
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='resortForm1'>
        <div className='resortttField'>
          <div className='resortInclude'>
            <label>Restaurant</label>
            {name && cuisine && openFor && menu && (
              <div className='addResortCategoryBtn' onClick={addRestaurant}>
                Add
              </div>
            )}
          </div>
          <div className='subResortField'>
            <h6>Name</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurant({
                  ...singleRestaurant,
                  name: e.target.value,
                })
              }
              value={name}
            />
          </div>
          <div className='subResortField'>
            <h6>Cuisine</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurant({
                  ...singleRestaurant,
                  cuisine: e.target.value,
                })
              }
              value={cuisine}
            />
          </div>
          <div className='subResortField'>
            <h6>Open For</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurant({
                  ...singleRestaurant,
                  openFor: e.target.value,
                })
              }
              value={openFor}
            />
          </div>
          <div className='subResortField'>
            <h6>Menu</h6>
            <input
              type='text'
              onChange={(e) =>
                setSingleRestaurant({
                  ...singleRestaurant,
                  menu: e.target.value,
                })
              }
              value={menu}
            />
          </div>
        </div>
        {restaurants && (
          <div className='resortShow'>
            {restaurants.map((r, i) => {
              return (
                <div>
                  <div key={i} className='resortShowS'>
                    <h6>
                      Name: <span> </span> {r.name}
                    </h6>
                    <h6>
                      Cuisine: <span> </span> {r.cuisine}
                    </h6>
                    <h6>
                      Open For: <span> </span> {r.openFor}
                    </h6>
                    <h6>
                      Menu: <span> </span> {r.menu}
                    </h6>
                  </div>
                  <div className='removv' onClick={() => delRestaurant(i)}>
                    remove
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='resortForm1'>
        <div className='resortttFieldd'>
          <div>
            <label>Resort rules</label>
          </div>
          <div className='subResortField'>
            <h6>Check in</h6>
            <input
              type='text'
              onChange={(e) =>
                setResortDetails({
                  ...resortDetails,
                  resortRules: {
                    ...resortRules,
                    checkIn: e.target.value,
                  },
                })
              }
              value={checkIn}
            />
          </div>
          <div className='subResortField'>
            <h6>Check out</h6>
            <input
              type='text'
              onChange={(e) =>
                setResortDetails({
                  ...resortDetails,
                  resortRules: {
                    ...resortRules,
                    checkOut: e.target.value,
                  },
                })
              }
              value={checkOut}
            />
          </div>
          <div className='subResortField'>
            <h6>Payment Link</h6>
            <input
              type='text'
              onChange={(e) =>
                setResortDetails({
                  ...resortDetails,
                  paymentLink: e.target.value,
                })
              }
              value={paymentLink}
            />
          </div>
          <div className='subResortField'>
            <h6>Honeymoon Benefits</h6>
            <CKEditor
              editor={ClassicEditor}
              data={honeymoonBenefits}
              onChange={(event, editor) => {
                const data = editor.getData();
                setHoneymoonBenefits(data);
              }}
            />
          </div>
          <div className='subResortField'>
            <h6>Cancel Policy</h6>
            <CKEditor
              editor={ClassicEditor}
              data={cancellationPolicy}
              onChange={(event, editor) => {
                const data = editor.getData();
                setCancellationPolicy(data);
              }}
            />
          </div>
        </div>
      </div>
      <div className='resortForm11'>
        <div className='resortttFielddd'>
          <label>Upload Pdf</label>
        </div>
        <div className='files'>
          <input type='file' onChange={uploadFile} />
        </div>
        <div>
          {imageUploaded && (
            <>
              <h5>{progress}%</h5>
              <Progress value={progress} animated={true} />
            </>
          )}
        </div>
      </div>
      <div className='resortButton'>
        {resortid ? (
          <button onClick={updateResort}>Update</button>
        ) : (
          <button
            onClick={submitResort}
            disabled={
              resortImages.length === 0 ||
              resortCategory.length === 0 ||
              !ratings
            }>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Resort;
