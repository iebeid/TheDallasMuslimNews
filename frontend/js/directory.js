const data = {
    mosques: [
        // Dallas County
        { name: "Dallas Masjid of Al-Islam (Masjid Al-Islam Dallas, MAI)", address: "2604 S Harwood St", city: "Dallas", phone: "(214) 421-3839", email: "info@masjidalislam.org", website: "masjidalislam.org", county: "Dallas" },
        { name: "Islamic Center of South Dallas", address: "2806 Martin Luther King Jr Blvd", city: "Dallas", phone: "(469) 677-0000", county: "Dallas" },
        { name: "Masjid Al Quran", address: "2420 Cedar Crest Blvd", city: "Dallas", phone: "(214) 948-3040", county: "Dallas" },
        { name: "Al Razzaq Islamic Centre", address: "11132 Shady Trail", city: "Dallas", phone: "(972) 603-8949", website: "al-razzaq-islamic.keeq.io", county: "Dallas" },
        { name: "Masjid Aisha (Musallah)", address: "14107 Haymeadow Dr", city: "Dallas", phone: "(469) 335-3345", county: "Dallas" },
        { name: "Masjid Ansar-Allah", address: "3455 Roberts Ave", city: "Dallas", phone: "(214) 428-8122", county: "Dallas" },
        { name: "Masjid Al-Tawheed", address: "1419 Acton Ave", city: "Duncanville", phone: "(214) 709-5042", county: "Dallas" },
        { name: "Islamic Association of North Texas (IANT Masjid)", address: "840 Abrams Road", city: "Richardson", phone: "972-231-5698", email: "webadmin@iant.com", website: "iant.com", county: "Dallas" },
        { name: "IANT - Richardson Musalla", address: "1600 Plano Rd, Suite 100", city: "Richardson", phone: "(972) 231-6828", county: "Dallas" },
        { name: "MAS Dallas (MAS Islamic Center of Dallas)", address: "1515 Blake Dr", city: "Richardson", phone: "(972) 633-9692", email: "officemanager@masdfw.org", website: "masdfw.org", county: "Dallas" },
        { name: "Islamic Center of Irving (ICI)", address: "2555 Esters Rd", city: "Irving", phone: "972-812-2230", email: "treasurer@irvingmasjid.org", website: "irvingmasjid.org", county: "Dallas" },
        { name: "Valley Ranch Islamic Center (VRIC)", address: "351 Ranchview Dr", city: "Irving", phone: "(214) 496-9000", website: "vric.org", county: "Dallas" },
        { name: "Barkaat-ul-Quran", address: "555 W Airport Fwy #178", city: "Irving", county: "Dallas" },
        { name: "Momin Masjid", address: "1019 Perry Rd", city: "Irving", phone: "(972) 518-3568", county: "Dallas" },
        { name: "Islamic Center of MOMIN (Metroplex Organization of Muslims in North Texas)", address: "2945 Frankford Rd", city: "Dallas", website: "momin.org", county: "Dallas" },
        { name: "Masjid Yaseen (Garland Branch)", address: "1601 W Campbell Rd", city: "Garland", phone: "(972) 414-7861", website: "masjidyaseen.org", county: "Dallas" },
        { name: "Makkah Masjid (Garland Makkah Masjid)", address: "3301 W Buckingham Rd", city: "Garland", phone: "(972) 675-4000", email: "ghulamjangda@gmail.com", website: "makkahmasjid.net", county: "Dallas" },
        { name: "Islamic Society of Mesquite", address: "5906 Duck Creek #4", city: "Garland", phone: "(972) 240-2783", county: "Dallas" },
        { name: "Mesquite Islamic Center (MIC)", address: "2403 Franklin Dr", city: "Mesquite", phone: "(972) 288-2680", email: "info@micmasjid.com", website: "micmasjid.com", county: "Dallas" },
        { name: "IANT - Mesquite Musalla", address: "2417 Gus Thomasson", city: "Mesquite", county: "Dallas" },
        { name: "Madinah Masjid of Carrollton", address: "2180 Old Denton Rd", city: "Carrollton", county: "Dallas" },
        { name: "Islamic Association of Carrollton (IAC) - Masjid Al-Rahman", address: "1901 Kelly Blvd", city: "Carrollton", phone: "(214) 390-1120", email: "info@masjidal-rahman.org", website: "masjidal-rahman.org", county: "Dallas" },
        { name: "Grand Prairie Masjid", address: "802 Greenview Dr suite b", city: "Grand Prairie", phone: "(877) 208-2048", county: "Dallas" },
        { name: "Imam Ali Islamic Center", address: "2330 Dalworth St", city: "Grand Prairie", phone: "(972) 206-0095", website: "www.icnyu.org", county: "Dallas" },
        { name: "Islamic Association of DeSoto (IADT)", address: "1120 W Belt Line Rd", city: "DeSoto", phone: "(972) 274-1101", website: "iadtweb.org", county: "Dallas" },
        { name: "DeSoto House of Peace - Mosque & Community Center", address: "531 W Belt Line Rd", city: "DeSoto", phone: "(972) 709-5042", website: "salamdesoto.org", county: "Dallas" },
        { name: "Islamic Association of Texas (Imam Abu Hanifa Masjid)", address: "132 N Glenville Dr", city: "Richardson", county: "Dallas" },
        { name: "Rahmania Center", address: "331 E Polk St", city: "Richardson", phone: "(469) 569-1406", website: "rahmaniacenter.com", county: "Dallas" },
        { name: "American Imams Academy (AIA Masjid)", address: "5206 Ben Davis Rd", city: "Sachse", phone: "(214) 893-2447", email: "info@aiamasjid.org", website: "aiamasjid.org", county: "Dallas" },
        // Collin County
        { name: "East Plano Islamic Center (EPIC)", address: "4700 14th Street", city: "Plano", phone: "(214) 744-3786", email: "operations@epicmasjid.org", website: "epicmasjid.org", county: "Collin" },
        { name: "Islamic Association of Collin County (IACC) / Plano Masjid", address: "6401 Independence Parkway", city: "Plano", phone: "972-491-5800", email: "info@planomasjid.org", website: "planomasjid.org", county: "Collin" },
        { name: "Islamic Association of Allen", address: "909 Allen Central Dr", city: "Allen", phone: "972-908-3330", website: "allenmasjid.com", county: "Collin" },
        { name: "Islamic Center of Frisco (ICF)", address: "11137 Frisco St", city: "Frisco", phone: "(469) 252-4532", email: "contact@friscomasjid.org", website: "friscomasjid.org", county: "Collin" },
        { name: "McKinney Islamic Association (MIA) / McKinney Masjid", address: "2940 Eldorado Pkwy Suite 100", city: "McKinney", phone: "(469) 252-4532", email: "info@mckinneyislamicassociation.org", website: "mckinneyislamicassociation.org", county: "Collin" },
        { name: "McKinney Frisco Islamic Center (MFIC)", address: "115 Aero Country Rd", city: "McKinney", phone: "(903) 746-7421", website: "mfic.weebly.com", county: "Collin" },
        { name: "Islamic Center of Wylie (ICW)", address: "3990 Lakeway Dr Suite #111", city: "St Paul", phone: "+1(469) 441-3355", email: "contact@icwtx.org", website: "icwtx.org", county: "Collin" },
        { name: "Faizan-e-Madinah Wylie", address: "641 W Brown St", city: "Wylie", phone: "(201) 737-0092", email: "bookkeeping@dawateislamiusa.com", county: "Collin" },
        { name: "Sachse Muslim Society", address: "7340 TX-78 #280", city: "Sachse", phone: "(214) 884-8853", website: "sachsemuslimsociety.net", county: "Collin" },
        { name: "Institute of Islamic Learning in Metroplex (IILM) / IILM Shia Center", address: "2101 W Plano Pkwy", city: "Plano", phone: "(972) 423-6000", website: "iilm.org", county: "Collin" },
        { name: "Islamic Center of Quad Cities (ICQC) / ICQC Masjid", address: "3620 TX-121 #200", city: "Plano", phone: "(972) 503-9956", email: "IT@icqcmasjid.org", website: "icqcmasjid.org", county: "Collin" },
        // Tarrant County
        { name: "Islamic Association of Tarrant County (IATC) - Masjid Al-Ibrahimi", address: "4901 Diaz Ave", city: "Fort Worth", phone: "(817) 737-8104", website: "iatconline.com", county: "Tarrant" },
        { name: "Islamic Association of Fort Worth - Madinah Center / The Islamic Center of Watauga (ICW)", address: "6005 Chapman Road", city: "Watauga", phone: "(817) 605-0863", website: "wataugamasjid.com", county: "Tarrant" },
        { name: "Islamic Association of Fort Worth (Musalla)", address: "5317 Bluemound Road", city: "Fort Worth", phone: "(817) 625-6211 Ext# 131", county: "Tarrant" },
        { name: "Masjid Hassan", address: "1201 E. Allen St", city: "Fort Worth", phone: "(817) 923-5929", county: "Tarrant" },
        { name: "Masjid Shakir Dawan", address: "2605 Ennis Ave", city: "Fort Worth", phone: "(817) 338-1826", county: "Tarrant" },
        { name: "Al-Hedayah Masjid / Masjid Al-Hedayah Academy", address: "8601 Randol Mill Rd", city: "Fort Worth", phone: "(817) 449-2626", website: "alhedayahacademy.com", county: "Tarrant" },
        { name: "Islamic Association of Fort Worth - Bait Al-Karim", address: "4500 Columbus Trail", city: "Fort Worth", phone: "(682) 200-2404", website: "dncfw.org", county: "Tarrant" },
        { name: "Keller Islamic Center (KIC)", address: "3601 Keller Hicks Rd", city: "Fort Worth", phone: "(972) 755-9542", website: "kellerislamiccenter.org", county: "Tarrant" },
        { name: "Islamic Unity Center", address: "1207 Country Club Ln", city: "Fort Worth", website: "islamicunitycenter.org", county: "Tarrant" },
        { name: "Dar El-Eman Islamic Center (DEIC)", address: "5511 Mansfield Rd", city: "Arlington", phone: "(817) 466-0505", website: "dareleman.org", county: "Tarrant" },
        { name: "Dar El Salam Islamic Center, Inc.", address: "747 Lamar Blvd", city: "Arlington", phone: "(817) 265-2596", website: "darelsalam.org", county: "Tarrant" },
        { name: "Islamic Center of Arlington / Islamic Society of Arlington Texas (ISAT)", address: "1700 S. Center Street", city: "Arlington", phone: "(817) 461-8415", website: "centermasjid.org", county: "Tarrant" },
        { name: "Zia ul Quran Masjid", address: "2425 Carter Dr", city: "Arlington", phone: "(817) 265-8500", website: "ziaulquranmasjid.com", county: "Tarrant" },
        { name: "Mansfield Islamic Center", address: "6401 New York Ave #135", city: "Arlington", phone: "(817) 465-1115", email: "info@mansfieldmasjid.org", website: "mansfieldmasjid.org", county: "Tarrant" },
        { name: "Dar Alhuda", address: "1245 Karla Dr", city: "Hurst", phone: "(817) 280-0201", website: "masjiddaralhuda.com", county: "Tarrant" },
        { name: "Islamic Association of Mid-Cities (IAMC) / Colleyville Masjid", address: "500 Cheek-Sparger Rd", city: "Colleyville", phone: "(817) 788-7872", website: "iamcenter.org", county: "Tarrant" },
        { name: "Islamic Center of Southlake", address: "1280 N Carroll Ave", city: "Southlake", phone: "(817) 912-1063", website: "southlakemasjid.com", county: "Tarrant" },
        { name: "Bayyinah Euless Musalla", address: "1701 W Euless Blvd", city: "Euless", county: "Tarrant" },
        // Denton County
        { name: "Islamic Society of Denton", address: "1105 Greenlee St", city: "Denton", phone: "940-484-1871", email: "info@dentonmasjid.com", website: "dentonmasjid.com", county: "Denton" },
        { name: "Islamic Association of Lewisville & Flower Mound (IALFM)", address: "3430 Peters Colony Rd", city: "Flower Mound", phone: "972-355-3937", email: "info@ialfm.org", website: "ialfm.org", county: "Denton" },
        { name: "IANT - Lewisville Musalla", address: "225 N. Poydras Street", city: "Lewisville", phone: "214-415-3628", county: "Denton" },
        { name: "Islamic Center of Aubrey", address: "26875 US Highway 380 E, Suite #100", city: "Aubrey", phone: "(469) 200-2131", email: "contact@aubreymasjid.org", website: "aubreymasjid.org", county: "Denton" },
        { name: "Islamic Association of The Colony (IATC)", address: "5201 South Colony Blvd., Suite 535", city: "The Colony", phone: "469-277-7248", website: "iatcus.org", county: "Denton" },
        { name: "City of Knowledge", address: "5000 Main St suite 228b", city: "The Colony", phone: "(469) 733-3304", county: "Denton" },
        { name: "Islamic Center of Coppell (ICC)", address: "612 E Sandy Lake Rd, Suite #100", city: "Coppell", phone: "972-947-2050", email: "admin@iccmasjid.org", website: "iccmasjid.org", county: "Denton" },
        // Other Counties
        { name: "Islamic Mosque of Texoma", address: "3601 Holly Drive", city: "Denison", phone: "(972) 893-6979", county: "Grayson" },
        { name: "Islamic Center of Waco (The Blue Mosque)", address: "2725 Benton Dr.", city: "Waco", website: "icwbluemosque.org", county: "McLennan" },
    ],
    schools: [
        { name: "Brighter Horizons Academy (BHA)", address: "3145 Medical Plaza Dr", city: "Garland", phone: "(972) 675-2062", website: "bhaprep.org", program: "Pre-K to 12th; IB World School" },
        { name: "Islamic School of Irving (ISI)", address: "2555 Esters Rd", city: "Irving", phone: "(972) 812-2230", email: "admissions@islamicschoolofirving.org", website: "islamicschoolofirving.org", program: "Pre-K to 12th; College Prep" },
        { name: "Qalam Collegiate Academy", address: "1111 Digital Dr Ste 101", city: "Richardson", phone: "(972) 437-2526", program: "Grades 5-12" },
        { name: "IANT Quranic Academy (IQA)", address: "840 Abrams Rd", city: "Richardson", phone: "972-231-8451", email: "iqamc@myiqa.org", website: "myiqa.org", program: "Quranic Academy, Hifz, Pre-K-12" },
        { name: "Good Tree Academy", address: "3600 K AVE", city: "Plano", phone: "(972) 836-6322", email: "office@goodtreeacademy.org", website: "goodtreeacademy.org", program: "Pre-K to 12th" },
        { name: "Ameen Academy", address: "3401 Silverstone Drive", city: "Plano", phone: "972-885-0786", email: "admin@ameenacademy.org", website: "ameenacademy.org", program: "Islamic School" },
        { name: "Read Institute of Texas", address: "716 E Main St", city: "Allen", phone: "(214) 301-9442", website: "readintexas.com", program: "Islamic School" },
        { name: "Little Horizons Academy (LHA)", city: "Richardson", phone: "(972) 414-5090", website: "islamicservices.org", program: "Islamic Preschool (Pre-K, K)" },
        { name: "ISF Quranic Institute (IQI)", city: "Richardson", phone: "(972) 414-5090", website: "islamicservices.org", program: "Hifz Program" },
        { name: "IACC Hifz Program (Plano Masjid)", address: "6401 Independence Pkwy", city: "Plano", phone: "(972) 491-5800", website: "planomasjid.org", program: "Full-Time Hifz Program" },
        { name: "EPIC Full-Time Hifz (East Plano Islamic Center)", address: "4700 14th St", city: "Plano", phone: "(214) 744-3786", website: "epicmasjid.org", program: "Full-Time Hifz Program" },
        { name: "Islamic Association of Allen Hifz Program", address: "909 Allen Central Dr", city: "Allen", phone: "972-908-3330", website: "allenmasjid.com", program: "Full-Time Hifz Program" },
        { name: "ICF Qur'an Academy (Frisco Masjid)", address: "11137 Frisco St", city: "Frisco", phone: "(469) 252-4532", website: "friscomasjid.org", program: "Qur'an Academy, Hifz Program" },
        { name: "American Imams Academy (Educational Services)", address: "5206 Ben Davis Rd", city: "Sachse", phone: "(214) 893-2447", website: "imamsacademy.org", program: "Weekend & Summer School, Hifz, Youth Programs" },
        { name: "Radiant Stem Academy", city: "DFW Area", website: "radiantstem.com/en", program: "Islamic School" },
        { name: "Rising Stars Academy", city: "DFW Area", program: "Day Care / Islamic School" },
        { name: "Little Leader Montessori", city: "Frisco", phone: "469-888-2071", program: "Home Day Care (Islamic Environment)" },
        { name: "Rare Learning Preschool", address: "11137 Frisco St", city: "Frisco", phone: "972-567-1771", website: "rarelearning.com", program: "Preschool (at Islamic Center)" },
        { name: "Institute of Quran and Ahlul Bayt (IQA Carrollton)", address: "1112 Milam Way", city: "Carrollton", phone: "(972) 417-2683", website: "iqa-carrollton.org", program: "Islamic Education, Quranic Studies" },
        { name: "Bayyina Academy", city: "Euless", program: "Higher Education/Research" },
        { name: "The Islamic Seminary of America (TISA)", city: "Richardson", program: "Higher Education/Seminary" },
        { name: "Salaam Academy", address: "735 N Plano Rd", city: "Richardson", phone: "(972) 704-4373", website: "salamfoundation.us", program: "Islamic School" },
        { name: "Beam Academy", city: "Allen/Plano", website: "beamacademy.com", program: "Youth Enrichment" },
        { name: "ALIA Language Institute", city: "Plano", website: "aliausa.org", program: "Arabic/Urdu Language Institute" },
        { name: "ISRA Foundation", address: "930 W Parker Rd Suite 530", city: "Plano", website: "israfoundation.com", program: "Youth Enrichment, Islamic Knowledge" },
        { name: "Qalam Institute", city: "Carrollton", website: "qalam.institute", program: "Islamic Seminary, Youth Enrichment" },
        { name: "Roots Community", city: "Carrollton", website: "rootsdfw.org", program: "Youth Enrichment" },
        { name: "Yaqeen Institute for Islamic Research", city: "Irving", website: "yaqeeninstitute.org", program: "Islamic Research, Educational Content" },
        { name: "Mist Dallas", city: "Dallas", website: "mistdallas.com", program: "Muslim Inter-Scholastic Tournament" },
        { name: "MYNA South Central (Dallas)", city: "Dallas", website: "myna.org", program: "Muslim Youth of North America" },
        { name: "AlMaghrib Institute (Dallas Chapter)", city: "Dallas", website: "almaghrib.org", program: "Islamic Sciences Education" },
    ],
    nonprofits: [
        { name: "Council on American-Islamic Relations, DFW (CAIR-TX DFW)", address: "2100 N Greenville Ave", city: "Richardson", phone: "469-960-4318", email: "info@cairdfw.org", website: "CAIRDFW.com", focus: "Civil liberties and advocacy" },
        { name: "Islamic Services Foundation (ISF)", address: "411 Industrial Rd, Suite 105", city: "Richardson", phone: "(972) 414-5090", website: "islamicservices.org", focus: "Establishing educational institutions" },
        { name: "Ma'ruf Dallas", address: "9319 Lyndon B Johnson Fwy Suite 110", city: "Dallas", phone: "(469) 399-0005", email: "info@marufdallas.com", website: "MarufDallas.com", focus: "Social services" },
        { name: "ICNA Relief Dallas", address: "10874 Plano Road #A", city: "Dallas", phone: "(469) 291-7411", email: "dallasclinic@icnarelief.org", website: "icnarelief.org/texas-dallas", focus: "Social services, free medical clinic" },
        { name: "DFWROS (DFW Refugee Outreach Services)", address: "9535 Forest Ln Ste 106", city: "Dallas", phone: "214-494-0180", email: "zeenik@dfwros.info", website: "dfwros.org", focus: "Refugee assistance" },
        { name: "HHRD Dallas (Helping Hand for Relief and Development)", address: "1845 Summit Ave, Ste 403", city: "Plano", phone: "(972) 234-4846", website: "hhrd.org", focus: "Humanitarian aid" },
        { name: "Amoud Foundation", address: "PO Box 165614", city: "Irving", phone: "972-871-8297", email: "execdirector@amoudfoundation.org", website: "amoudfoundation.org", focus: "Crisis to sustainability programs" },
        { name: "Islamic Relief DFW / South Central (Islamic Relief USA)", address: "811 S Central Expy, Suite #440", city: "Richardson", phone: "(972) 424-4479", website: "irusa.org", focus: "Relief and development" },
        { name: "Pure Hands", city: "Sachse", website: "purehands.org", focus: "Humanitarian Aid" },
        { name: "Muslim Legal Fund of America (MLFA)", city: "Richardson", website: "mlfa.org", focus: "Legal aid and advocacy" },
        { name: "Sabrina Memorial Foundation", city: "Richardson", website: "sabrinamemorial.org", focus: "Charitable activities" },
        { name: "The Islamic Community of Greater Killeen Inc", city: "Killeen", website: "icgk.org", focus: "Community services, masjid expansion" },
    ],
    associations: [
        { name: "Texas Muslim Coalition", city: "DFW", website: "minaretfoundation.com/texas-muslim-coalition/", focus: "Statewide network for legislative advocacy" },
        { name: "North Texas Islamic Council (NTIC)", city: "Dallas", focus: "Regional Islamic council" },
        { name: "American Muslim Professionals of Dallas (AMPD)", city: "Dallas/Fort Worth", email: "ampd.calendar@gmail.com", website: "ampdallas.org", focus: "Professional networking" },
        { name: "DFW Muslim Bar Association (DFWMBA)", city: "DFW", website: "dfwmuslimbar.com", focus: "Union of Muslim lawyers and law students" },
        { name: "Muslim Youth of North America (MYNA) South Central", city: "Dallas", website: "myna.org", focus: "Youth leadership and development" },
    ]
};

const contentArea = document.getElementById('directory-content');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function createCard(item, category) {
    let details = '';
    if (item.address && item.city) details += `<p class="text-sm text-gray-600">${item.address}, ${item.city}</p>`;
    else if (item.city) details += `<p class="text-sm text-gray-600">${item.city}</p>`;
    if (item.phone) details += `<p class="text-sm text-gray-600 mt-1"><strong>Phone:</strong> ${item.phone}</p>`;
    if (item.email) details += `<p class="text-sm text-gray-600 mt-1"><strong>Email:</strong> <a href="mailto:${item.email}" class="text-blue-600 hover:underline">${item.email}</a></p>`;
    if (item.program) details += `<p class="text-sm text-gray-600 mt-1"><strong>Program:</strong> ${item.program}</p>`;
    if (item.focus) details += `<p class="text-sm text-gray-600 mt-1"><strong>Focus:</strong> ${item.focus}</p>`;

    return `
        <div class="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 fade-in flex flex-col h-full">
            <div class="flex-grow">
                <h3 class="font-semibold text-lg text-gray-800">${item.name}</h3>
                <div class="mt-2">
                    ${details}
                </div>
            </div>
            ${item.website ? `<div class="mt-3 pt-3 border-t border-gray-100">
                <a href="http://${item.website.split(' ')[0]}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                    Visit Website &rarr;
                </a>
            </div>` : ''}
        </div>
    `;
}

function createSection(title, items, category) {
    if (items.length === 0) return '';

    const cards = items.map(item => createCard(item, category)).join('');

    return `
        <section id="${category}" class="mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-500">${title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${cards}
            </div>
        </section>
    `;
}

function renderContent(filterTerm = '', category = 'all') {
    contentArea.innerHTML = '';
    let content = '';

    const term = filterTerm.toLowerCase();

    const filteredData = {
        mosques: data.mosques.filter(item => JSON.stringify(item).toLowerCase().includes(term)),
        schools: data.schools.filter(item => JSON.stringify(item).toLowerCase().includes(term)),
        nonprofits: data.nonprofits.filter(item => JSON.stringify(item).toLowerCase().includes(term)),
        associations: data.associations.filter(item => JSON.stringify(item).toLowerCase().includes(term)),
    };

    if (category === 'all' || category === 'mosques') {
        content += createSection('Islamic Centers & Mosques', filteredData.mosques, 'mosques');
    }
    if (category === 'all' || category === 'schools') {
        content += createSection('Schools & Educational Institutions', filteredData.schools, 'schools');
    }
    if (category === 'all' || category === 'nonprofits') {
        content += createSection('Non-Profits & Charities', filteredData.nonprofits, 'nonprofits');
    }
    if (category === 'all' || category === 'associations') {
        content += createSection('Associations & Community Groups', filteredData.associations, 'associations');
    }

    if (content.trim() === '') {
         contentArea.innerHTML = `<div class="text-center py-12"><p class="text-gray-500">No results found for "${filterTerm}".</p></div>`;
    } else {
         contentArea.innerHTML = content;
    }
}

searchInput.addEventListener('input', () => {
    renderContent(searchInput.value, categoryFilter.value);
});

categoryFilter.addEventListener('change', () => {
    renderContent(searchInput.value, categoryFilter.value);
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
});