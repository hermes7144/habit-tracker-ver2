import { BsFillBarChartFill, BsMagic, BsSignpostSplitFill, BsMusicNoteBeamed, BsListCheck } from 'react-icons/bs';
import { FaCalendarCheck } from 'react-icons/fa';
import habitPlanner from '../assets/img/habit-planner.jpg';
import dashboard from '../assets/img/dashboard.png';
import habitList from '../assets/img/habitList.png';
import BarChart from '../assets/img/barChart.png';
import performance from '../assets/img/performance.png';
import editHabit from '../assets/img/editHabit.png';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <>
      <main>
        <div className='relative pt-16 pb-1 flex content-center justify-center min-h-screen-75'>
          <div className='absolute top-0 w-full h-full bg-center bg-cover bg-banner opacity-85'></div>
          <div className='container relative mx-auto'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4 ml-auto mr-auto text-center mt-20'>
                <div className='mb-3'>
                  <p className='mt-4 text-2xl leading-relaxed text-white font-semibold'>우리는 우리가 반복적으로 하는 것 그 자체입니다. 그러므로 탁월함은 행위가 아니라 습관입니다.</p>
                  <p className='text-lg text-white italic text-end'>- 아리스토텔레스</p>
                </div>
                <Link to='/auth/login'>
                  <button className='text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 hover:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150'>Get started</button>
                </Link>
              </div>
            </div>
          </div>
          <div className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px' style={{ transform: 'translateZ(0)' }}>
            <svg className='absolute bottom-0 overflow-hidden' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' version='1.1' viewBox='0 0 2560 100' x='0' y='0'>
              <polygon className='text-blueGray-100 fill-current' points='2560 0 2560 100 0 100'></polygon>
            </svg>
          </div>
        </div>

        <section className='pb-20 bg-blueGray-100 -mt-24'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap'>
              <div className='lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-300'>
                      <BsMagic className='text-2xl' />
                    </div>
                    <h6 className='text-xl font-semibold'>매력적이다</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>Habiter는 시각적으로 진전의 증거를 제공하여 내적 동기를 부여합니다.</p>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-300'>
                      <BsSignpostSplitFill className='text-2xl' />
                    </div>
                    <h6 className='text-xl font-semibold'>분명하다</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>Habiter는 행동을 일깨우는 시각적 신호를 만듭니다.</p>
                  </div>
                </div>
              </div>

              <div className='pt-6 w-full md:w-4/12 px-4 text-center'>
                <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                  <div className='px-4 py-5 flex-auto'>
                    <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-300'>
                      <BsMusicNoteBeamed className='text-2xl' />
                    </div>
                    <h6 className='text-xl font-semibold'>만족스럽다</h6>
                    <p className='mt-2 mb-4 text-blueGray-500'>Habiter는 성공적으로 습관을 추적하고 기록하는 순간 만족감을 느끼게 해줍니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap items-center mt-32'>
              <div className='w-full md:w-5/12 px-4 mr-auto ml-auto'>
                <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                  <BsFillBarChartFill className='text-2xl' />
                </div>
                <h3 className='text-3xl mb-2 font-semibold leading-normal'>습관은 복리로 작용합니다!</h3>
                <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>성공은 일상적인 습관의 결과입니다. 우리의 삶은 한순간의 변화로 만들어지는 것이 아닙니다.</p>
                <p className='text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600'>습관은 목표가 아닌 시스템에 달려 있습니다. 목표는 우리가 얻어내고자 하는 결과이며, 시스템은 그 결과로 이끄는 과정입니다.</p>
              </div>

              <div className='w-full md:w-4/12 px-4 mr-auto ml-auto'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500'>
                  <img alt='habitPlanner' src={habitPlanner} className='w-full align-middle rounded-t-lg' />
                  <blockquote className='relative p-8 mb-4'>
                    <svg preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 583 95' className='absolute left-0 w-full block h-95-px -top-94-px'>
                      <polygon points='-30,95 583,95 583,65' className='text-lightBlue-500 fill-current'></polygon>
                    </svg>
                    <h4 className='text-xl font-bold text-white'>인생을 효율적으로</h4>
                    <p className='text-md font-light mt-2 text-white'>습관은 인생을 따분하게 만든다고 의심할 수도 있습니다. </p>
                    <p className='text-md font-light mt-2 text-white'>습관을 조정하고, 삶의 기본적인 일들을 더 쉽게 만들면 우리의 마음은 새로운 도전들을 포착하고 다음에 벌어질 문제들을 해결하는데 더 자유로워집니다.</p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='pt-48 md:pt-40 pb-40 relative bg-blueGray-100'>
          <div className='container mx-auto overflow-hidden pb-20'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full md:w-5/12 px-4 mr-auto ml-auto mt-32'>
                <div className='relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0'>
                  {/* <img alt='...' src={require('../assets/img/component-btn.png').default} className='w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px' /> */}

                  <img alt='...' src={BarChart} className='w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-80 left-25-px z-2' />
                  <img alt='...' src={editHabit} className='w-full align-middle rounded absolute shadow-lg max-w-210-px -top-60 left-260-px' />
                  <img alt='...' src={habitList} className='w-full align-middle rounded-lg absolute shadow-lg max-w-sm  z-3' />
                  <img alt='...' src={performance} className='w-full align-middle rounded-lg absolute shadow-2xl max-w-210-px -top-36 left-20 ' />
                  {/* <img alt='...' src={require('../assets/img/component-btn-pink.png').default} className='w-full align-middle rounded absolute shadow-xl max-w-120-px left-195-px top-95-px' /> */}
                </div>
              </div>
              <div className='w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48'>
                <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                  <BsListCheck className='text-3xl' />
                </div>
                <h3 className='text-3xl mb-2 font-semibold leading-normal'>습관 도구들</h3>
                <p className='text-lg font-light leading-relaxed mt-4 mb-32 text-blueGray-600'>Habiter는 습관을 생성하고, 기록하고, 습관의 진행 사항을 효율적으로 확인할 수 있습니다.</p>
                {/* <div className='block pb-6'>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Buttons</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Inputs</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Labels</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Menus</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Navbars</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Pagination</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Progressbars</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Typography</span>
              </div> */}
              </div>
            </div>

            {/* <div className='flex flex-wrap items-center pt-32'>
            <div className='w-full md:w-6/12 px-4 mr-auto ml-auto mt-32'>
              <div className='justify-center flex flex-wrap relative'>
                <div className='my-4 w-full lg:w-6/12 px-4'>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-red-600 shadow-lg rounded-lg text-center p-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg' />
                      <p className='text-lg text-white mt-4 font-semibold'>Svelte</p>
                    </div>
                  </a>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg' />
                      <p className='text-lg text-white mt-4 font-semibold'>ReactJS</p>
                    </div>
                  </a>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg' />
                      <p className='text-lg text-white mt-4 font-semibold'>NextJS</p>
                    </div>
                  </a>
                </div>
                <div className='my-4 w-full lg:w-6/12 px-4 lg:mt-16'>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-yellow-500 shadow-lg rounded-lg text-center p-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png' />
                      <p className='text-lg text-white mt-4 font-semibold'>JavaScript</p>
                    </div>
                  </a>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg' />
                      <p className='text-lg text-white mt-4 font-semibold'>Angular</p>
                    </div>
                  </a>
                  <a href='https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index' target='_blank'>
                    <div className='bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8'>
                      <img alt='...' className='shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white' src='https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg' />
                      <p className='text-lg text-white mt-4 font-semibold'>Vue.js</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className='w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                <i className='fas fa-drafting-compass text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal'>Javascript Components</h3>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>In order to create a great User Experience some components require JavaScript. In this way you can manipulate the elements on the page and give more options to your users.</p>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>We created a set of Components that are dynamic and come to help you.</p>
              <div className='block pb-6'>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Alerts</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Dropdowns</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Menus</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Modals</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Navbars</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Popovers</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Tabs</span>
                <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2'>Tooltips</span>
              </div>
              <a href='https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=nr-index' target='_blank' className='font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150'>
                View all <i className='fa fa-angle-double-right ml-1 leading-relaxed'></i>
              </a>
            </div>
          </div> */}
          </div>

          {/* Complex Documentation */}
          <div className='container mx-auto px-4 pb-32 pt-48'>
            <div className='items-center flex flex-wrap'>
              <div className='w-full md:w-5/12 ml-auto px-12 md:px-4'>
                <div className='md:pr-12'>
                  <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white'>
                    <FaCalendarCheck className='text-2xl' />
                  </div>
                  <h3 className='text-3xl font-semibold'>직관적인 대시보드</h3>
                  <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>날짜를 선택하면 선택한 주의 각 습관 확인 및 체크할 수 있으며, 연동되는 차트로 진척도를 한눈에 확인할 수 있습니다.</p>
                  {/* <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fas fa-fingerprint'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>Built by Developers for Developers</h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='fab fa-html5'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>Carefully crafted code for Components</h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3'>
                          <i className='far fa-paper-plane'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>Dynamic Javascript Components</h4>
                      </div>
                    </div>
                  </li>
                </ul> */}
                </div>
              </div>

              <div className='w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0'>
                <img
                  alt='...'
                  className='max-w-full rounded-lg shadow-xl'
                  style={{
                    transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)',
                  }}
                  src={dashboard}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
