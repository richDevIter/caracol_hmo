import Loading from '@/components/Loading/Loading';
import styles from './skeletons.module.css';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DropDownLanguageSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-20 w-36 rounded-md bg-white flex items-center"></div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function BannerHomeSkeleton() {
  return (
    <div
      className={`${shimmer} relative mb-4 overflow-hidden rounded-md bg-gray-200`}
      style={{ height: '530px' }}
    >
      <Loading />
    </div>
  );
}

export function HomeCarrouselMainAttractionsSkeleton() {
  return (
    <div>
      <div className="container_content p-0">
        <div className={`${styles.main_attractions}  px-4 md:px-0`}>
          <div
            className={`${styles.text_preload} animated-background pb-2`}
          ></div>
          <div className={`${styles.text_preload} animated-background`}></div>
        </div>
      </div>
      <div
        className={`${shimmer} container_content p-0 flex justify-between gap-2`}
      >
        <div className={`${styles.main_attractions} px-4 md:px-0`}>
          <div
            className={`${styles.img_main_attractions_preload} animated-background`}
          ></div>
          <div
            className={`${styles.card_content_main_attractions} pt-4 md:pt-6 pb-2`}
          >
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
          </div>
        </div>
        <div className={`${styles.main_attractions} px-4 md:px-0`}>
          <div
            className={`${styles.img_main_attractions_preload} animated-background`}
          ></div>
          <div
            className={`${styles.card_content_main_attractions} pt-4 md:pt-6 pb-2`}
          >
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
          </div>
        </div>
        <div className={`${styles.main_attractions} px-4 md:px-0`}>
          <div
            className={`${styles.img_main_attractions_preload} animated-background`}
          ></div>
          <div
            className={`${styles.card_content_main_attractions} pt-4 md:pt-6 pb-2`}
          >
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
          </div>
        </div>
        <div className={`${styles.main_attractions} px-4 md:px-0`}>
          <div
            className={`${styles.img_main_attractions_preload} animated-background`}
          ></div>
          <div
            className={`${styles.card_content_main_attractions} pt-4 md:pt-6 pb-2`}
          >
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
            <div
              className={`${styles.text_preload} animated-background mb-3`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeNextAttractionsSkeleton() {
  return (
    <div className={`${styles.bg_next_attractions} animated-background`}>
      <div className="container_content p-0">
        <div
          className={`${styles.text_preload_next} animated-background`}
        ></div>
        <div
          className={`${styles.text_preload_next} animated-background`}
        ></div>
        <div className="grid grid-cols-12 row_controll">
          <div className="col-span-12 md:col-span-6 px-3">
            <div className="grid grid-cols-12 row_controll">
              <div className="col-span-12 px-3">
                <div
                  className={`${styles.img_next_attractions_preload} animated-background`}
                ></div>
              </div>
              <div className="col-span-12 px-3">
                <div
                  className={`${styles.img_next_attractions_preload} animated-background`}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 px-3">
            <div>
              <div>
                <div
                  className={`${styles.img_next_attractions_preload_solo} animated-background`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TourTicketSkeleton() {
  return (
    <div className="container_content">
      <div className="mt-2 mb-10">
        <div className={`${styles.text_preload} animated-background mb-5 `}></div>
        <div className={`${styles.text_preload} animated-background `}></div>
        <div className={`${styles.text_preload} animated-background `}></div>
        <div className={`${styles.text_preload} animated-background `}></div>
      </div>
      <div className="flex justify-between max-h-max">
        <div className={`${styles.img_tour_preload} animated-background`}></div>
        <div>
          <div className={`${styles.img_tour_preload_duo} animated-background mb-5`}></div>
          <div className={`${styles.img_tour_preload_duo} animated-background`}></div>
        </div>
      </div>
      <div className="mt-5">
        <div className={`${styles.text_preload} animated-background py-6 mb-5`}></div>
        <div className={`mt-7 ${styles.tour_content} grid grid-cols-12 row_controll gap-5`}>
          <div className='col-span-12 md:col-span-8 overflow-hidden mx-3'>
            <div>
              <div className={`${styles.text_preload} animated-background mb-5`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
            </div>
            <div className='pt-9'>
              <div className={`${styles.text_preload} animated-background mb-5`}></div>
              <div className={`${styles.text_preload} animated-background py-10`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
            </div>
            <div className='pt-9'>
              <div className={`${styles.text_preload} animated-background mb-5`}></div>
              <div className={`${styles.text_preload} animated-background py-16`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
            </div>
            <div className={`${styles.img_tour_preload_products} mt-7 animated-background`}></div>
            <div className='pt-9'>
              <div className={`${styles.text_preload} animated-background mb-5`}></div>
              <div className={`${styles.text_preload} animated-background py-12`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
            </div>
            <div className='pt-9'>
              <div className={`${styles.text_preload} animated-background mb-5`}></div>
              <div className={`${styles.text_preload} animated-background`}></div>
            </div>
          </div>
          <div className={`${styles.img_tour_preload_prices} animated-background col-span-12 md:col-span-4 px-3 order-first md:order-last`}></div>
        </div>
        <div className={`${styles.img_tour_preload_app} my-9 animated-background`}></div>
      </div>
    </div>
  );
}

export function DestinosSkeleton() {
  return (
    <>
      <div className={`${styles.img_destiny_banner} w-full h-screen bg-center animated-background`}></div>
      <div>
        <div>
          <div className={`${styles.destiny_content_main} container_content`}>
            <div className="container mx-auto py-8">
              <div className={`flex flex-wrap -mx-4 justify-around`}>
                <div className={`${styles.img_destiny_flex} w-full md:w-1/4 px-4 animated-background`}></div>
                <div className={`${styles.img_destiny_flex} w-full md:w-1/4 px-4 animated-background`}></div>
                <div className={`${styles.img_destiny_flex} w-full md:w-1/4 px-4 animated-background`}></div>
                <div className={`${styles.img_destiny_flex} w-full md:w-1/4 px-4 animated-background`}></div>
              </div>
            </div>
          </div>
          <div className='container mx-auto pt-8'>
            <div className={`${styles.DestinyKnowCity} container_content`}>
              <div className={`grid grid-cols-1 md:grid-cols-2`}>
                <div className={`${styles.content_destiny_knowCity}`}>
                  <div className={`${styles.text_preload} mb-5 py-12 animated-background `}></div>
                  <div className={`${styles.text_preload} py-24 animated-background `}></div>
                </div>
                <div className={`grid grid-cols-2 gap-4`}>
                  <div className={`${styles.img_destiny_grid_1} animated-background`}></div>
                  <div className={`${styles.img_destiny_grid_2} animated-background`}></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.destiny_popular_content} container_content h-full`}>
              <div className='flex items-center'>
                <div className='flex items-center pr-12'>
                  <div className={`${styles.img_destiny_popular} animated-background`}></div>
                  <div className={`${styles.img_destiny_popular_main} animated-background`}></div>
                  <div className={`${styles.img_destiny_popular} animated-background`}></div>
                </div>
                <div className=''>
                  <div className={`${styles.text_preload} w-96 py-20 mb-5 animated-background`}></div>
                  <div className={`${styles.destiny_btn} animated-background`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.destiny_what_do} animated-background`}>
            <div className='container_content mt-4'>
              <div>
                <div className='grid grid-cols-12'>
                  <div className={`col-span-12 md:col-span-6`}>
                    <div className={`${styles.destiny_what_do_text}`}>
                      <div className={`${styles.text_preload} mb-2 py-14 animated-background`}></div>
                      <div className={`${styles.text_preload} mb-10 py-20 animated-background`}></div>
                      <div className={`${styles.destiny_what_do_btn} animated-background`}></div>
                    </div>
                  </div>
                  <div className={`col-span-12 md:col-span-6`}>
                    <div className={`grid grid-cols-12 gap-x-5`}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.destiny_next}`}>
            <div className='container_content h-full'>
              <div className='flex'>
                <div>
                  <div className={`${styles.destiny_next_text_1} animated-background`}></div>
                  <div className={`${styles.destiny_next_text_2} animated-background`}></div>
                </div>
                <div className='flex items-center -mt-12 pl-12'>
                  <div className={`${styles.img_destiny_popular} animated-background`}></div>
                  <div className={`${styles.img_destiny_popular_main} animated-background`}></div>
                  <div className={`${styles.img_destiny_popular} animated-background`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className='container mx-auto'>
            <div className={`${styles.destiny_security} container_content px-0`}>
              <div className='grid grid-cols-12 items-center'>
                <div className={`${styles.img_destiny_security} col-span-12 md:col-span-2 pr-5 animated-background`}></div>
                <div className={`${styles.img_destiny_security} col-span-12 md:col-span-2 pr-5 animated-background`}></div>
                <div className={`${styles.img_destiny_security} col-span-12 md:col-span-2 pr-5 animated-background`}></div>
                <div className={`col-span-12 md:col-span-6`}>
                  <div className={`${styles.destiny_security_text_1} animated-background`}></div>
                  <div className={`${styles.destiny_security_text_2} animated-background`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.img_next_preload_app} container_content my-9 animated-background`}></div>
        </div>
      </div>
    </>

  )
}

export function ActivitiesSkeleton() {
  return (
    <>
      <div className='container_content -mt-20'>
        <div className='grid grid-cols-12'>
          <div className={`${styles.ActivitiesFilter} animated-background col-span-3 px-2 hidden md:block`}></div>
          <div className={`${styles.ActivitiesContent} col-span-12 md:col-span-9 px-0 md:px-2`}>
            <div className='px-2'>
              <div className={`animated-background mb-4 mt-2 py-3`}></div>
              <div className={`animated-background mb-4 py-3`}></div>
            </div>
            <div className={`p-3 mb-4`}>
              <div className={`grid grid-cols-12 p-3 mb-4`}>
                <div className={`${styles.Activities_img} animated-background col-span-12 md:col-span-4 px-0`}></div>
                <div className={`col-span-12 md:col-span-8`}>
                  <div className={`grid grid-cols-12 pl-5`}>
                    <div className={`col-span-12 md:col-span-8`}>
                      <div className={`mb-2 py-6 animated-background`}></div>
                      <div className={`mb-2 py-3 animated-background`}></div>
                      <div className={`py-12 animated-background`}></div>
                    </div>
                    <div className={`col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0`}>
                      <div className={`${styles.Activities_text} py-4 mb-2 animated-background`}></div>
                      <div className={`${styles.Activities_text} py-2 animated-background`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-12 p-3 mb-4`}>
                <div className={`${styles.Activities_img} animated-background col-span-12 md:col-span-4 px-0`}></div>
                <div className={`col-span-12 md:col-span-8`}>
                  <div className={`grid grid-cols-12 pl-5`}>
                    <div className={`col-span-12 md:col-span-8`}>
                      <div className={`mb-2 py-6 animated-background`}></div>
                      <div className={`mb-2 py-3 animated-background`}></div>
                      <div className={`py-12 animated-background`}></div>
                    </div>
                    <div className={`col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0`}>
                      <div className={`${styles.Activities_text} py-4 mb-2 animated-background`}></div>
                      <div className={`${styles.Activities_text} py-2 animated-background`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-12 p-3 mb-4`}>
                <div className={`${styles.Activities_img} animated-background col-span-12 md:col-span-4 px-0`}></div>
                <div className={`col-span-12 md:col-span-8`}>
                  <div className={`grid grid-cols-12 pl-5`}>
                    <div className={`col-span-12 md:col-span-8`}>
                      <div className={`mb-2 py-6 animated-background`}></div>
                      <div className={`mb-2 py-3 animated-background`}></div>
                      <div className={`py-12 animated-background`}></div>
                    </div>
                    <div className={`col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0`}>
                      <div className={`${styles.Activities_text} py-4 mb-2 animated-background`}></div>
                      <div className={`${styles.Activities_text} py-2 animated-background`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-12 p-3 mb-4`}>
                <div className={`${styles.Activities_img} animated-background col-span-12 md:col-span-4 px-0`}></div>
                <div className={`col-span-12 md:col-span-8`}>
                  <div className={`grid grid-cols-12 pl-5`}>
                    <div className={`col-span-12 md:col-span-8`}>
                      <div className={`mb-2 py-6 animated-background`}></div>
                      <div className={`mb-2 py-3 animated-background`}></div>
                      <div className={`py-12 animated-background`}></div>
                    </div>
                    <div className={`col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0`}>
                      <div className={`${styles.Activities_text} py-4 mb-2 animated-background`}></div>
                      <div className={`${styles.Activities_text} py-2 animated-background`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-12 p-3 mb-4`}>
                <div className={`${styles.Activities_img} animated-background col-span-12 md:col-span-4 px-0`}></div>
                <div className={`col-span-12 md:col-span-8`}>
                  <div className={`grid grid-cols-12 pl-5`}>
                    <div className={`col-span-12 md:col-span-8`}>
                      <div className={`mb-2 py-6 animated-background`}></div>
                      <div className={`mb-2 py-3 animated-background`}></div>
                      <div className={`py-12 animated-background`}></div>
                    </div>
                    <div className={`col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0`}>
                      <div className={`${styles.Activities_text} py-4 mb-2 animated-background`}></div>
                      <div className={`${styles.Activities_text} py-2 animated-background`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex justify-end my-4 py-4 animated-background`}></div>
          </div>
        </div>
        <div className={`${styles.img_next_preload_app} container_content my-9 animated-background`}></div>
      </div>
    </>
  )
}

export function SlowBuySkeleton(styles: any) {
  return (
    <div className={`${styles.bg_slow_buy} container-page my-4`}>
      <h2 className={`${styles.slow_buy_title} animated-background`} style={{ height: "36px", width: "50%" }}></h2>
      <div className="grid grid-cols-12 fast-buy-content" style={{ height: "100%x" }}>
        <div className={`${styles.slow_buy_description} col-span-12 md:col-span-5`} style={{ marginBottom: "40px" }}>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "50%", marginBottom: "15px" }}></div>

          <div className='' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>

          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "50%", marginBottom: "15px" }}></div>

          <div className='' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>

          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>
          <div className='animated-background' style={{ height: "12px", width: "50%", marginBottom: "15px" }}></div>

          <div className='' style={{ height: "12px", width: "100%", marginBottom: "15px" }}></div>

          <div className='animated-background' style={{ height: "12px", width: "30%", marginBottom: "15px" }}></div>



        </div>

        <div className={`${styles.slow_buy_people} col-span-12 md:col-span-7`}>
          <h4 className="text-primary animated-background" style={{ height: "24px", width: "50%" }}></h4>
          <div className="text-primary animated-background" style={{ height: "18px", width: "40%" }}></div>
          <div className="text-primary animated-background" style={{ height: "36px", width: "100%", marginTop: "30px" }}></div>

          <div className="buy-button">
            <div className="btn btn-block  link-add animated-background" style={{ height: "36px", width: "30%", marginTop: "30px" }}></div>
          </div>
        </div>

      </div>
    </div>
  )
}