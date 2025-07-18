export default function Popup() {
    return (
        <>
            <div className="bb-popnews-bg fixed left-[0] top-[0] w-full h-full bg-[#00000080] hidden z-[25] hidden" style={{display: 'block'}}></div>
            <div className="bb-popnews-box w-full max-w-[600px] p-[24px] fixed left-[50%] top-[50%] bg-[#fff] hidden z-[25] text-center rounded-[15px] overflow-hidden max-[767px]:w-[90%]" style={{display: 'block'}}>
                <div className="bb-popnews-close transition-all duration-[0.3s] ease-in-out w-[16px] h-[20px] absolute top-[-5px] right-[27px] bg-[#e04e4eb3] rounded-[10px] cursor-pointer hover:bg-[#e04e4e]" title="Close"></div>
                <div className="flex flex-wrap mx-[-12px]">
                    <div className="min-[768px]:w-[50%] w-full px-[12px]">
                        <img src="https://maraviyainfotech.com/projects/blueberry-tailwind/assets/img/newsletter/newsletter.jpg" alt="newsletter" className="w-full rounded-[15px] max-[767px]:hidden"/>
                    </div>
                    <div className="min-[768px]:w-[50%] w-full px-[12px]">
                        <div className="bb-popnews-box-content h-full flex flex-col items-center justify-center">
                            <h2 className="font-quicksand text-[#3d4750] block text-[22px] leading-[33px] font-semibold mt-[0] mx-[auto] mb-[10px] tracking-[0] capitalize">Newsletter.</h2>
                            <p className="font-Poppins font-light tracking-[0.03rem] mb-[8px] text-[14px] leading-[22px] text-[#686e7d]">Subscribe the BlueBerry to get in touch and get the future update.</p>
                            <form className="bb-popnews-form mt-[0]" action="#" method="post">
                                <input type="email" name="newsemail" placeholder="Email Address" className="mb-[20px] bg-transparent border-[1px] border-solid border-[#eee] text-[#3d4750] text-[14px] py-[10px] px-[15px] w-full outline-[0] rounded-[10px] font-normal" required/>
                                    <button type="button" className="bb-btn-2 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[15px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]" name="subscribe">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
