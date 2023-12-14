import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import './Destination.css';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegLightbulb } from 'react-icons/fa';
import { HiInformationCircle, HiOutlineExternalLink } from 'react-icons/hi';
import { firedb } from '../firebase';
import Typed from 'react-typed';

export default function Destination() {
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [activeCity, setActiveCity] = useState({});
  const [about, setAbout] = useState('');
  const [showCity, setShowCity] = useState(true);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState('');

  // console.log('markers', markers);
  // console.log('about', about);
  // console.log('activeCity', activeCity);

  const gaiaData = () => {
    const m = [];
    firedb.ref('/gaiadata').on('value', (data) => {
      if (isMounted.current) {
        data.forEach((c) => {
          m.push(c.val());
        });
      }
    });
    setMarkers(m);
  };
  const gaiaSuggestions = () => {
    firedb
      .ref('/gaiaSuggestions')
      .push({
        suggestions: suggestions,
      })
      .then(() => {
        setSuggestions('');
        setShowSubmitted(true);
      })
      .catch((err) => console.log('err', err));
  };

  useEffect(() => {
    isMounted.current = true;
    gaiaData();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  return (
    <>
      {loading ? (
        <Typed
          className='gaiaEarth'
          strings={["Hey ! I'm Gaia"]}
          typeSpeed={120}
          backSpeed={20}
          showCursor={false}
        />
      ) : null}
      <div className='gaiaEarths'>
        <p>Click and drag the globe to spin it</p>
      </div>
      <>
        <>
          <div className='suggestionMainClose'>
            {showSuggestion ? (
              <div
                onClick={() => {
                  setShowSuggestion(false);
                }}>
                <AiOutlineClose color='#f7cd2e' style={{ fontSize: 20 }} />
              </div>
            ) : (
              <div
                onClick={() => {
                  setShowSuggestion(true);
                }}>
                <FaRegLightbulb color='#f7cd2e' style={{ fontSize: 35 }} />
              </div>
            )}
          </div>
          {showSuggestion ? (
            <div className='suggestionMain'>
              <div>
                <h6>
                  Would you like Gaia to do anything else? Help us customise her
                  better for your tastes
                </h6>
              </div>
              <div>
                <textarea
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  cols='30'
                  rows='4'
                />
              </div>
              <div>
                {showSubmitted ? (
                  <button>Thank for you response</button>
                ) : (
                  <button onClick={gaiaSuggestions}>Submit</button>
                )}
              </div>
            </div>
          ) : null}
          {visible ? (
            <>
              <div className='typedAboutMainClose'>
                {showCity ? (
                  <div
                    onClick={() => {
                      setShowCity(false);
                    }}>
                    <AiOutlineClose color='#f7cd2e' style={{ fontSize: 20 }} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setShowCity(true);
                    }}>
                    <HiInformationCircle
                      color='#f7cd2e'
                      style={{ fontSize: 20 }}
                    />
                  </div>
                )}
              </div>
              {showCity ? (
                <div className='typedAboutMain'>
                  <div className='typedAbout'>
                    {activeCity.country === 'India' ? (
                      <Link
                        className='plink'
                        target='_blank'
                        to={{
                          pathname: '/planned-tour',
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h6 style={{ marginBottom: 0 }}>{activeCity.city}</h6>
                          <HiOutlineExternalLink
                            color='#f7cd2e'
                            style={{ paddingLeft: 5, fontSize: 20 }}
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link
                        className='plink'
                        target='_blank'
                        to={{
                          pathname: `/countrydetails/${activeCity.country}`,
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h6 style={{ marginBottom: 0 }}>{activeCity.city}</h6>
                          <HiOutlineExternalLink
                            color='#f7cd2e'
                            style={{ paddingLeft: 5, fontSize: 20 }}
                          />
                        </div>
                      </Link>
                    )}
                    <div>
                      <p style={{ fontSize: 14 }}>{about}</p>
                    </div>
                    {/* <Typed strings={[about]} typeSpeed={40} backSpeed={20} /> */}
                    {/* <Typed
                      strings={[activeCity.about]}
                      typeSpeed={40}
                      backSpeed={20}
                    /> */}
                  </div>
                  <div className='routeCountry'>
                    <p>
                      You're just a click away from the edge of the world! Keep
                      exploring with Gaia
                    </p>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </>
        <Globe
          animateIn={true}
          globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
          backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
          labelsData={markers}
          labelLat={(d) => d.latitude}
          labelLng={(d) => d.longitude}
          labelText={(d) => d.city}
          labelSize={0.002}
          labelDotRadius={0.6}
          labelColor={() => '#f7cd2e'}
          onLabel
          labelResolution={2}
          labelLabel={(label) => {
            setShowSubmitted(false);
            setAbout(label.about);
            setActiveCity(label);
            if (visible) {
              setVisible(false);
            }
            setVisible(true);
            return `<h6 class="labelAbout" >${label.city},${label.country}</h6>`;
          }}
        />
      </>
    </>
  );
}
