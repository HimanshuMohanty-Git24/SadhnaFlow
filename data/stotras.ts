/*
 * =================================================================
 * FILE TO UPDATE: /data/stotras.ts
 * This is the complete, unabridged code with all stanzas.
 * =================================================================
 */
export type Stanza = {
  sanskrit: string;
  transliteration: string;
  translation: string;
};

export type Stotra = {
  id: string;
  title: string;
  audio: 'kal_bhairav.mp3' | 'bhairava_stotra.mp3' | 'hanuman_chalisa.mp3' | 'Ashtottara_bhairav.mp3';
  stanzas: Stanza[];
};

export const STOTRAS: Stotra[] = [
  {
    id: '1',
    title: 'Kāla Bhairava Aṣṭakam',
    audio: 'kal_bhairav.mp3',
    stanzas: [
        {
            sanskrit: `देवराजसेव्यमानपावनांघ्रिपङ्कजं
व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम् ।
नारदादियोगिवृन्दवन्दितं दिगंबरं
काशिकापुराधिनाथकालभैरवं भजे ॥१॥`,
            transliteration: `Deva-Raaja-Sevyamaana-Paavana-Angghri-Pankajam
Vyaala-Yajnya-Suutram-Indu-Shekharam Krpaakaram |
Naarada-[A]adi-Yogi-Vrnda-Vanditam Digambaram
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||1||`,
            translation: `Salutations to Lord Kalabhairava, the supreme lord of Kashi, whose lotus feet are revered by Lord Indra; who has a snake as his sacrificial thread, a moon on his head and is very compassionate; who is praised by Narada and other yogis; and who is a Digambara, wearing the sky as his dress.`
        },
        {
            sanskrit: `भानुकोटिभास्वरं भवाब्धितारकं परं
नीलकण्ठमीप्सितार्थदायकं त्रिलोचनम् ।
कालकालमंबुजाक्षमक्षशूलमक्षरं
काशिकापुराधिनाथकालभैरवं भजे ॥२॥`,
            transliteration: `Bhaanu-Kotti-Bhaasvaram Bhavaabdhi-Taarakam Param
Niila-Kannttham-Iipsita-Artha-Daayakam Trilocanam |
Kaala-Kaalam-Ambuja-Akssam-Akssa-Shuulam-Akssaram
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||2||`,
            translation: `Salutations to Lord Kalabhairava, who has the brilliance of a million suns, who saves devotees from the cycle of rebirths; who has a blue throat, who grants our desires, and who has three eyes; who is death unto death itself and whose eyes look like a lotus; whose trident supports the world and who is immortal.`
        },
        {
            sanskrit: `शूलटङ्कपाशदण्डपाणिमादिकारणं
श्यामकायमादिदेवमक्षरं निरामयम् ।
भीमविक्रमं प्रभुं विचित्रताण्डवप्रियं
काशिकापुराधिनाथकालभैरवं भजे ॥३॥`,
            transliteration: `Shuula-Tanka-Paasha-Danndda-Paannim-Aadi-Kaarannam
Shyaama-Kaayam-Aadi-Devam-Akssaram Nir-Aamayam |
Bhiimavikramam Prabhum Vichitra-Taannddava-Priyam
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||3||`,
            translation: `Salutations to Lord Kalabhairava, who holds the trident, mattock, noose, and club in his hands; whose body is dark, who is the primordial Lord, who is immortal, and free from the diseases of the world; who is immensely mighty and who loves the wonderful tandava dance.`
        },
        {
            sanskrit: `भुक्तिमुक्तिदायकं प्रशस्तचारुविग्रहं
भक्तवत्सलं स्थितं समस्तलोकविग्रहम् ।
विनिक्वणन्मनोज्ञहेमकिङ्किणीलसत्कटिं
काशिकापुराधिनाथकालभैरवं भजे ॥४॥`,
            transliteration: `Bhukti-Mukti-Daayakam Prashasta-Caaru-Vigraham
Bhakta-Vatsalam Sthitam Samasta-Loka-Vigraham |
Vi-Nikvannan-Manojnya-Hema-Kinkinnii-Lasat-Kattim
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||4||`,
            translation: `Salutations to Lord Kalabhairava, the one who bestows both desires and salvation, who has a pleasing appearance; who is loving to his devotees, who is stable as the god of all the worlds; who wears a golden belt around his waist with bells that make a melodious sound when he moves.`
        },
        {
            sanskrit: `धर्मसेतुपालकं त्वधर्ममार्गनाशकं
कर्मपाशमोचकं सुशर्मदायकं विभुम् ।
स्वर्णवर्णशेषपाशशोभिताङ्गमण्डलं
काशिकापुराधिनाथकालभैरवं भजे ॥५॥`,
            transliteration: `Dharma-Setu-Paalakam Tva-Adharma-Maarga-Naashakam Karma-Paasha-Mocakam Su-Sharma-Daayakam Vibhum |
Svarnna-Varnna-Shessa-Paasha-Shobhitaangga-Mannddalam
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||5||`,
            translation: `Salutations to Lord Kalabhairava, who ensures that dharma (righteousness) prevails, who destroys the path of adharma (unrighteousness); who saves us from the bonds of karma, thereby freeing our soul; and who has golden-hued snakes entwined around his body.`
        },
        {
            sanskrit: `रत्नपादुकाप्रभाभिरामपादयुग्मकं
नित्यमद्वितीयमिष्टदैवतं निरंजनम् ।
मृत्युदर्पनाशनं करालदंष्ट्रमोक्षणं
काशिकापुराधिनाथकालभैरवं भजे ॥६॥`,
            transliteration: `Ratna-Paadukaa-Prabhaabhi-Raama-Paada-Yugmakam
Nityam-Advitiiyam-Isstta-Daivatam Niramjanam |
Mrtyu-Darpa-Naashanam Karaala-Damssttra-Mokssannam
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||6||`,
            translation: `Salutations to Lord Kalabhairava, whose feet are adorned with two golden sandals with gems; who is the eternal, non-dual Ishta devata (god who grants our desires); who destroys the pride of Yama (God of Death); whose terrible teeth liberate us.`
        },
        {
            sanskrit: `अट्टहासभिन्नपद्मजाण्डकोशसंततिं
दृष्टिपातनष्टपापजालमुग्रशासनम् ।
अष्टसिद्धिदायकं कपालमालिकाधरं
काशिकापुराधिनाथकालभैरवं भजे ॥७॥`,
            transliteration: `Atttta-Haasa-Bhinna-Padmaja-Anndda-Kosha-Samtatim
Drsstti-Paata-Nasstta-Paapa-Jaalam-Ugra-Shaasanam |
Asstta-Siddhi-Daayakam Kapaala-Maalikaa-Dharam
Kaashikaa-Pura-Adhinaatha-Kaalabhairavam Bhaje ||7||`,
            translation: `Salutations to Lord Kalabhairava, whose loud roar destroys the sheaths of creations (meaning the delusions of our mind) of the lotus-born Brahma; whose very glance is enough to destroy all our sins; who gives us the eight siddhis (accomplishments); and who wears a garland of skulls.`
        },
        {
            sanskrit: `भूतसंघनायकं विशालकीर्तिदायकं
काशिवासलोकपुण्यपापशोधकं विभुम् ।
नीतिमार्गकोविदं पुरातनं जगत्पतिं
काशिकापुराधिनाथकालभैरवं भजे ॥८॥`,
            transliteration: `Bhuuta-Samgha-Naayakam Vishaala-Kiirti-Daayakam
Kaashi-Vaasa-Loka-Punnya-Paapa-Shodhakam Vibhum |
Niiti-Maarga-Kovidam Puraatanam Jagatpatim
Kaashikaapuraadhinaathakaalabhairavam Bhaje ||8||`,
            translation: `Salutations to Lord Kalabhairava, who is the leader of ghosts and goblins, who bestows glory; who frees the people of Kashi from their sinful and righteous deeds; who guides us on the path of righteousness, who is the most ancient (eternal) lord of the universe.`
        },
        {
            sanskrit: `कालभैरवाष्टकं पठंति ये मनोहरं
ज्ञानमुक्तिसाधनं विचित्रपुण्यवर्धनम् ।
शोकमोहदैन्यलोभकोपतापनाशनं
प्रयान्ति कालभैरवांघ्रिसन्निधिं नरा ध्रुवम् ॥९॥`,
            transliteration: `Kaalabhairavaassttakam Patthamti Ye Manoharam
Jnyaana-Mukti-Saadhanam Vicitra-Punnya-Vardhanam |
Shoka-Moha-Dainya-Lobha-Kopa-Taapa-Naashanam
Prayaanti Kaalabhairava-Amghri-Sannidhim Naraa Dhruvam ||9||`,
            translation: `Those who read these eight verses of the Kalabhairava Ashtakam, which is beautiful, which is a source of knowledge and liberation, which increases the various forms of righteousness in a person, which destroys grief, attachment, poverty, greed, anger, and heat – will attain (after death) the feet of Lord Kalabhairava.`
        }
    ]
  },
  {
    id: '2',
    title: 'Abhinavagupta’s Bhairava Stotra',
    audio: 'bhairava_stotra.mp3',
    stanzas: [
        {
            sanskrit: `व्याप्तचराचरभावविशेषं
चिन्मयमेकमनन्तमनादिम् ।
भैरवनाथमनाथशरण्यं
तन्मयचित्ततया हृदि वन्दे ॥१॥`,
            transliteration: `vyāpta-carācara-bhāva-viśeṣaṁ
cinmayam-ekam-anantam-anādim /
bhairava-nātham-anātha-śaraṇyaṁ
tan-maya-citta-tayā hṛdi vande //1//`,
            translation: `I, Abhinavagupta, with one pointed devotion, am praying to that supreme all-pervading Lord Śiva, who is himself present in each and everything that exists, and who through realization reveals himself as the one limitless Bhairavanātha the protector of the helpless.`
        },
        {
            sanskrit: `त्वन्मयमेतदशेषमिदानीं
भाति मम त्वदनुग्रहशक्त्या ।
त्वं च महेश! सदैव ममात्मा
स्वात्ममयं मम तेन समस्तम्॥२॥`,
            transliteration: `tvanmayam-etad-aśeṣam-idānīṁ
bhāti mama tvad-anugraha-śaktyā /
tvaṁ ca maheśa! sadaiva mamātmā
svātmam-ayaṁ mama tena samastam //2//`,
            translation: `By the energy of your grace it has been revealed to me that this vibrating universe is your own existence. Thus, O Lord Śiva, this realization has come to me that you are my own soul and as such this universe is my own expression and existence.`
        },
        {
            sanskrit: `स्वात्मनि विश्वगते त्वयि नाथे
तेन न संसृतिभीतिः कथाऽस्ति ।
सत्स्वपि दुर्धरदुःखविमोह-
त्रासविधायिषु कर्मगणेषु ॥३॥`,
            transliteration: `svātmani viśvagate tvayi nāthe
tena na saṁsṛti-bhītiḥ kathā’sti /
satsvapi durdhara-duḥkha-vimoha-
trāsa-vidhāyiṣu karma-gaṇeṣu //3//`,
            translation: `O possessor of everything, though your devotees, bound by karma and conditioning of mind, are caught in the net of destiny that arouses troubles and bondage, still they are not afraid of the fret and fever of this world. Having realized this universe as your own existence they are not afraid of worldly difficulties, because fear exists only when there is someone else to inflict it, but when there is none other than You how can fear arise.`
        },
        {
            sanskrit: `अन्तक! मां प्रति मा दृशमेनां
क्रोधकरालतमां विदधीहि ।
शङ्करसेवनचिन्तनधीरो
भीषणभैरवशक्तिमयोऽस्मि ॥४॥`,
            transliteration: `antaka! māṁ prati mā dṛśamenāṁ
krodha-karāla-tamāṁ vidadhīhi /
śaṅkara-sevana-cintana-dhīro
bhīṣaṇa-bhairava-śakti-mayo‘smi //4//`,
            translation: `O angel of death, do not look towards me with wrathful and frightening eyes as I am always absorbed in the worship of Lord Śiva. Through constant devotion, meditation and reflection, I have become steadfast and courageous, one with the energy of the terrifying Bhairava, thus, your dreadful and frightening looks can do me no harm.`
        },
        {
            sanskrit: `इत्थमुपोढ़भवन्मयसंवि-
द्दीधितिदारितभूरितमिस्रः।
मृत्युर्यमान्तककर्मपिशाचै-
र्नाथ! नमोऽस्तु न जातु बिभेमि ॥५॥`,
            transliteration: `ittham-upoḍha-bhavan-maya-saṁvid-
dīdhiti-dārita-bhūri-tamisraḥ /
mṛtyur-yamāntaka-karma-piśācair-
nātha! namo‘stu na jatu bibhemi //5//`,
            translation: `O Lord Bhairava, I offer salutations to you who has awakened me to the realization that everything in existence is you alone. As a result of this awakening, the darkness of my mind has been destroyed and I am neither frightened of the evil family of demons nor am I afraid of Yama, the fearful Lord of death.`
        },
        {
            sanskrit: `प्रोदितसत्यविबोधमरीचि-
प्रोक्षितविश्वपदार्थसतत्त्वः ।
भावपरामृतनिर्भरपूर्णे
त्वय्यऽहमात्मनि निर्वृत्तिमेमि ॥६॥`,
            transliteration: `prodita-satya-vibodha-marīci-
prokṣita-viśva-padārtha-satattvaḥ /
bhāva-parāmṛta-nirbhara-pūrṇe
tvayya‘ham-ātmani nirvṛttim-emi //6//`,
            translation: `O Lord Śiva, it is through your existence, revealed to me by real knowledge, that I realize all attachments and all that exists in this universe is activated by you. It is by this awakening that my mind becomes saturated with immortal devotion and I experience supreme bliss.`
        },
        {
            sanskrit: `मानसगोचरमेति यदैव
क्लेशदशाऽतनुतापविधात्री ।
नाथ! तदैव मम त्वदभेद-
स्तोत्रपराऽमृतवृष्टिरुदेति ॥७॥`,
            transliteration: `mānasa-gocaram-eti yadaiva
kleśa-daśā’tanu-tāpa-vidhātrī /
nātha! tadaiva mama tvad-abheda-
stotra-parā’mṛta-vṛṣṭirud-eti // 7 //`,
            translation: `O Lord, sometimes I feel misery which arouses torment in my mind, but at that same moment, blessed by a shower of your grace, a clean and clear vision of my oneness with you arises, the impact of which my mind feels appeased.`
        },
        {
            sanskrit: `शङ्कर! सत्यमिदं व्रतदान-
स्नानतपो भवतापविनाशि ।
तावकशास्त्रपराऽमृतचिन्ता
स्यन्दति चेतसि निर्वृत्तिधाराम् ॥८॥`,
            transliteration: `śaṅkara! satyam-idaṁ vrata-dāna-
snāna-tapo bhava-tāpa-vināśi /
tāvaka-śāstra-parā’mṛta-cintā
syandati cetasi nirvṛtti-dhārām //8//`,
            translation: `O Lord Śiva, it is said that through charity, ritual bath and the practices of penance the troubles of worldly existence subside, but even more than this, by remembrance of the sacred śāstras and your words alone the current of immortality like a stream of peace enters my heart.`
        },
        {
            sanskrit: `नृत्यति गायति हृष्यति गाढं
संविदियं मम भैरवनाथ! ।
त्वां प्रियमाप्य सुदर्शनमेकं
दुर्लभमन्यजनैः समयज्ञम् ॥९॥`,
            transliteration: `nṛtyati gāyati hṛṣyati gāḍhaṁ
saṁvid-iyaṁ mama bhairava-nātha /
tvāṁ priyam-āpya sudarśanam-ekaṁ
durlabham-anya-janaiḥ sama-yajñam //9//`,
            translation: `O Lord Bhairava, through my utmost faith I have perceived you in the unique sacrifice of oneness, which otherwise is not possible though performing mountains of rituals. Being filled with your presence my consciousness intensely dances and sings, enjoying its own ecstasy.`
        },
        {
            sanskrit: `वसुरसपौषे कृष्णदशम्या-
मभिनवगुप्तः स्तवमिदमकरोत् ।
येन विभुर्भवमरुसन्तापं
शमयति झटिति जनस्य दयालुः॥१०॥`,
            transliteration: `vasu-rasa-pauṣe kṛṣṇa-daśamyāṁ-
abhinavaguptaḥ stavam-idam-akarot /
yena vibhur-bhava-maru-santāpaṁ
śamayati jhaṭiti janasya dayāluḥ //10//`,
            translation: `O compassionate Lord, under the influence of your glory and for the benefit of your worshipers, I Abhinavagupta have composed this hymn. By meditation and recitation of this hymn within a moment that merciful Lord Bhairava destroys the torments and sufferings springing from this wilderness of saṁsāra.`
        }
    ]
  },
  {
    id: '3',
    title: 'Hanuman Chalisa',
    audio: 'hanuman_chalisa.mp3',
    stanzas: [
        {
            sanskrit: `श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि ।
बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥`,
            transliteration: `Shri guru charan saroj raj neej manu mukur sudhari ।
Baranu raghubar bimal jasu jo dayaku phal chari ॥`,
            translation: `Cleansing the mirror of my mind with the dust from the lotus feet of the divine Guru, I describe the pure glory of the best of the Raghus, which bestows the four fruits of life.`
        },
        {
            sanskrit: `बुद्धिहीन तनु जानिके सुमिरौं पवन-कुमार ।
बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार ॥`,
            transliteration: `Buddhi heen tanu janike sumero pavan kumar ।
Bal buddhi bidya deu mohi harau kales bikar ॥`,
            translation: `Knowing my body to be devoid of intelligence, I remember the Son of the Wind. Grant me strength, wisdom, and knowledge, and remove my afflictions and blemishes.`
        },
        {
            sanskrit: `जय हनुमान ज्ञान गुन सागर ।
जय कपीस तिहुँ लोक उजागर ॥`,
            transliteration: `Jai Hanuman gyan gun sagar ।
Jai kapis tihu lok ujagar ॥`,
            translation: `Victory to Hanuman, the ocean of wisdom and virtue. Victory to the Lord of Monkeys, who is the enlightener of the three worlds.`
        },
        {
            sanskrit: `राम दूत अतुलित बल धामा ।
अंजनि पुत्र पवनसुत नामा ॥`,
            transliteration: `Ram doot atulit bal dhama ।
Anjani putra pavan sut nama ॥`,
            translation: `You are the divine messenger of Shri Ram. The repository of immeasurable strength, though known only as Son of Pavan (Wind), born of Anjani.`
        },
        {
            sanskrit: `महावीर विक्रम बजरंगी ।
कुमति निवार सुमति के संगी ॥`,
            transliteration: `Mahavir vikram bajrangi ।
Kumati nivar sumati ke sangi ॥`,
            translation: `With limbs as sturdy as Vajra (The mace of God Indra) you are valiant and brave. On you attends good sense and wisdom. You dispel the darkness of evil thoughts.`
        },
        {
            sanskrit: `कंचन वरन विराज सुवेसा ।
कानन कुंडल कुंचित केसा ॥`,
            transliteration: `Kanchan varan viraj suvesa ।
Kanan kundal kunchit kesa ॥`,
            translation: `Your physique is beautiful golden coloured and your dress is pretty. You wear ear rings and have long curly hair.`
        },
        {
            sanskrit: `हाथ वज्र और ध्वजा विराजै ।
काँधे मूंज जनेऊ साजै ॥`,
            transliteration: `Hath vajra aur dhvaja viraje ।
Kandhe moonj janehu sajai ॥`,
            translation: `You carry in your hand a lightning bolt along with a victory (kesari) flag and wear the sacred thread on your shoulder.`
        },
        {
            sanskrit: `शंकर सुवन केसरी नंदन ।
तेज प्रताप महा जग वंदन ॥`,
            transliteration: `Shankar suvan kesari nandan ।
Tej pratap maha jag vandan ॥`,
            translation: `As a descendant of Lord Sankar, you are a comfort and pride of Shri Kesari. With the lustre of your vast sway, you are propitiated all over the universe.`
        },
        {
            sanskrit: `विद्यावान गुनी अति चातुर ।
राम काज करिबे को आतुर ॥`,
            transliteration: `Vidyavan guni ati chatur ।
Ram kaj karibe ko atur ॥`,
            translation: `You are the repository of learning, virtuous and fully accomplished, always keen to carry out the behest's of Shri Ram.`
        },
        {
            sanskrit: `प्रभु चरित्र सुनिबे को रसिया ।
राम लखन सीता मन बसिया ॥`,
            transliteration: `Prabhu charitra sunibe ko rasiya ।
Ram Lakhan Sita man basiya ॥`,
            translation: `You are an ardent listener, always so keen to listen to the narration of Shri Ram's life stories. Your heart is filled with what Shri Ram stood for. You therefore always dwell in the hearts of Shri Ram, Lakshman and Sita.`
        },
        {
            sanskrit: `सूक्ष्म रूप धरि सियहिं दिखावा ।
विकट रूप धरि लंक जरावा ॥`,
            transliteration: `Sukshma roop dhari siyahi dikhava ।
Vikat roop dhari lanka jarava ॥`,
            translation: `You appeared before Sita in a diminutive form and spoke to her in humility. You assumed an awesome form and struck terror by setting Lanka on fire.`
        },
        {
            sanskrit: `भीम रूप धरि असुर संहारे ।
रामचंद्र के काज संवारे ॥`,
            transliteration: `Bhim roop dhari asur sanghare ।
Ramachandra ke kaj sanvare ॥`,
            translation: `With overwhelming might you destroyed the Asuras (demons) and performed all tasks assigned to you by Shri Ram with great skill.`
        },
        {
            sanskrit: `लाय सजीवन लखन जियाये ।
श्रीरघुवीर हरषि उर लाये ॥`,
            transliteration: `Laye sanjivan Lakhan jiyaye ।
Shri Raghuvir harashi ur laye ॥`,
            translation: `You brought Sanjivan (A herb that revives life) and restored Lakshman back to life, Shri Raghuvir (Shri Ram) cheerfully embraced you with his heart full of joy.`
        },
        {
            sanskrit: `रघुपति कीन्ही बहुत बड़ाई ।
तुम मम प्रिय भरतहि सम भाई ॥`,
            transliteration: `Raghupati kinhi bahut badai ।
Tum mam priye Bharathi sam bhai ॥`,
            translation: `Shri Raghupati (Shri Ram) lustily extolled your excellence and said: "You are as dear to me as my own brother Bharat."`
        },
        {
            sanskrit: `सहस बदन तुम्हरो यश गावें ।
अस कहि श्रीपति कंठ लगावें ॥`,
            transliteration: `Sahas badan tumharo yash gaave ।
As kahi Shripati kanth lagaave ॥`,
            translation: `Thousands of living beings are chanting hymns of your glories; saying thus, Shri Ram warmly hugged him (Shri Hanuman).`
        },
        {
            sanskrit: `सनकादिक ब्रह्मादि मुनीसा ।
नारद सारद सहित अहीसा ॥`,
            transliteration: `Sanakadik Brahmadi Muneesa ।
Narad Sarad sahit Aheesa ॥`,
            translation: `When prophets like Sanak, even the Sage like Lord Brahma, the great hermit Narad himself, Goddess Saraswati and Aheesa (one of immeasurable dimensions).`
        },
        {
            sanskrit: `यम कुबेर दिगपाल जहां ते ।
कवि कोविद कहि सके कहां ते ॥`,
            transliteration: `Yam Kuber Digpal jahan te ।
Kavi kovid kahi sake kahan te ॥`,
            translation: `Even Yamraj (God of Death) Kuber (God of Wealth) and the Digpals (deputies guarding the four corners of the Universe) have been vying with one another in offering homage to your glories. How then, can a mere poet give adequate expression of your super excellence.`
        },
        {
            sanskrit: `तुम उपकार सुग्रीवहिं कीन्हा ।
राम मिलाय राजपद दीन्हा ॥`,
            transliteration: `Tum upkar Sugreevahin keenha ।
Ram milaye rajpad deenha ॥`,
            translation: `You rendered a great service to Sugriv. You united him with Shri Ram and he installed him on the Royal Throne.`
        },
        {
            sanskrit: `तुम्हरो मंत्र विभीषन माना ।
लंकेश्वर भये सब जग जाना ॥`,
            transliteration: `Tumharo mantra Vibheeshan mana ।
Lankeshwar bhaye sub jag jana ॥`,
            translation: `By heeding your advice, Vibhishan became Lord of Lanka. This is known all over the Universe.`
        },
        {
            sanskrit: `जुग सहस्र योजन पर भानू ।
लील्यो ताहि मधुर फल जानू ॥`,
            transliteration: `Yug sahastra jojan par Bhanu ।
Leelyo tahi madhur phal janu ॥`,
            translation: `On your own you dashed upon the Sun, which is at a fabulous distance of thousands of miles, thinking it to be a sweet luscious fruit.`
        },
        {
            sanskrit: `प्रभु मुद्रिका मेलि मुख माहीं ।
जलधि लांघि गये अचरज नाहीं ॥`,
            transliteration: `Prabhu mudrika meli mukh mahee ।
Jaladhi langhi gaye achraj nahee ॥`,
            translation: `Carrying the Lord's Signet Ring in your mouth, there is hardly any wonder that you easily leapt across the ocean.`
        },
        {
            sanskrit: `दुर्गम काज जगत के जेते ।
सुगम अनुग्रह तुम्हरे तेते ॥`,
            transliteration: `Durgaam kaj jagat ke jete ।
Sugam anugraha tumhre tete ॥`,
            translation: `The burden of all difficult tasks of the world become light with your kind grace.`
        },
        {
            sanskrit: `राम दुआरे तुम रखवारे ।
होत न आज्ञा बिनु पैसारे ॥`,
            transliteration: `Ram duware tum rakhvare ।
Hoat na agya binu paisare ॥`,
            translation: `You are the sentry at the door of Shri Ram's Divine Abode. No one can enter it without your permission.`
        },
        {
            sanskrit: `सब सुख लहै तुम्हारी सरना ।
तुम रक्षक काहू को डरना ॥`,
            transliteration: `Sub sukh lahai tumhari sarna ।
Tum rakshak kahu ko dar na ॥`,
            translation: `All comforts of the world lie at your feet. The devotees enjoy all divine pleasures and feel fearless under your benign Protection.`
        },
        {
            sanskrit: `आपन तेज सम्हारो आपै ।
तीनों लोक हांक तें कांपै ॥`,
            transliteration: `Aapan tej samharo aapai ।
Teenhon lok hank te kanpai ॥`,
            translation: `You alone are befitted to carry your own splendid valour. All the three worlds (entire universe) tremor at your thunderous call.`
        },
        {
            sanskrit: `भूत पिशाच निकट नहिं आवै ।
महावीर जब नाम सुनावै ॥`,
            transliteration: `Bhoot pisach nikat nahin aavai ।
Mahavir jab naam sunavai ॥`,
            translation: `All the ghosts, demons and evil forces keep away, with the sheer mention of your great name, O Mahaveer!!`
        },
        {
            sanskrit: `नासै रोग हरै सब पीरा ।
जपत निरंतर हनुमत बीरा ॥`,
            transliteration: `Nase rog harai sab peera ।
Japat nirantar Hanumant beera ॥`,
            translation: `All diseases, pain and suffering disappear on reciting regularly Shri Hanuman's holy name.`
        },
        {
            sanskrit: `संकट तें हनुमान छुड़ावै ।
मन क्रम वचन ध्यान जो लावै ॥`,
            transliteration: `Sankat te Hanuman chudavai ।
Man Karam Vachan dyan jo lavai ॥`,
            translation: `Those who remember Shri Hanuman in thought, words and deeds with sincerity and faith, are rescued from all crises in life.`
        },
        {
            sanskrit: `सब पर राम तपस्वी राजा ।
तिन के काज सकल तुम साजा ॥`,
            transliteration: `Sub par Ram tapasvee raja ।
Tin ke kaj sakal Tum saja ॥`,
            translation: `All who hail, worship and have faith in Shri Ram as the Supreme Lord and the king of penance. You make all their difficult tasks very easy.`
        },
        {
            sanskrit: `और मनोरथ जो कोई लावै ।
सोइ अमित जीवन फल पावै ॥`,
            transliteration: `Aur manorath jo koi lavai ।
Sohi amit jeevan phal pavai ॥`,
            translation: `Whosoever comes to you for fulfillment of any desire with faith and sincerity, will he alone secure the imperishable fruit of human life.`
        },
        {
            sanskrit: `चारों युग परताप तुम्हारा ।
है परसिद्ध जगत उजियारा ॥`,
            transliteration: `Charon Yug partap tumhara ।
Hai persidh jagat ujiyara ॥`,
            translation: `All through the four ages your magnificent glory is acclaimed far and wide. Your fame is radiantly acclaimed all over the Cosmos.`
        },
        {
            sanskrit: `साधु संत के तुम रखवारे ।
असुर निकंदन राम दुलारे ॥`,
            transliteration: `Sadhu Sant ke tum Rakhware ।
Asur nikandan Ram dulhare ॥`,
            translation: `You are Saviour and the guardian angel of Saints and Sages and destroy all Demons. You are the angelic darling of Shri Ram.`
        },
        {
            sanskrit: `अष्ट सिद्धि नव निधि के दाता ।
अस वर दीन जानकी माता ॥`,
            transliteration: `Ashta sidhi nav nidhi ke dhata ।
As var deen Janki mata ॥`,
            translation: `You can grant to any one, any yogic power of Eight Siddhis (power to become light and heavy at will) and Nine Nidhis (Riches, comfort, power, prestige, fame, sweet relationship etc.) This boon has been conferred upon you by Mother Janki.`
        },
        {
            sanskrit: `राम रसायन तुम्हरे पासा ।
सदा रहो रघुपति के दासा ॥`,
            transliteration: `Ram rasayan tumhare pasa ।
Sada raho Raghupati ke dasa ॥`,
            translation: `You possess the power of devotion to Shri Ram. In all rebirths you will always remain Shri Raghupati's most dedicated disciple.`
        },
        {
            sanskrit: `तुम्हरे भजन राम को पावै ।
जनम जनम के दुख बिसरावै ॥`,
            transliteration: `Tumhare bhajan Ram ko pavai ।
Janam janam ke dukh bisravai ॥`,
            translation: `Through hymns sung in devotion to you, one can find Shri Ram and become free from sufferings of several births.`
        },
        {
            sanskrit: `अंत काल रघुवीर पुर जाई ।
जहाँ जन्म हरि-भक्त कहाई ॥`,
            transliteration: `Anth kaal Raghuvir pur jayee ।
Jahan janam Hari-Bakht Kahayee ॥`,
            translation: `If at the time of death one enters the Divine Abode of Shri Ram, thereafter in all future births he is born as the Lord's devotee.`
        },
        {
            sanskrit: `और देवता चित्त न धरहीं ।
हनुमत सेइ सर्व सुख करहीं ॥`,
            transliteration: `Aur Devta Chit na dharehi ।
Hanumanth se hi sarve sukh karehi ॥`,
            translation: `One need not entertain any other deity for propitiation, as devotion of Shri Hanuman alone can give all happiness.`
        },
        {
            sanskrit: `संकट कटै मिटै सब पीरा ।
जो सुमिरै हनुमत बलबीरा ॥`,
            transliteration: `Sankat kate mite sab peera ।
Jo sumirai Hanumat Balbeera ॥`,
            translation: `One is freed from all the sufferings and ill fated contingencies of rebirths in the world. One who adores and remembers Shri Hanuman.`
        },
        {
            sanskrit: `जय जय जय हनुमान गोसाईं ।
कृपा करहु गुरुदेव की नाईं ॥`,
            transliteration: `Jai Jai Jai Hanuman Gosahin ।
Kripa Karahu Gurudev ki nyahin ॥`,
            translation: `Hail, Hail, Hail, Shri Hanuman, Lord of senses. Let your victory over the evil be firm and final. Bless me in the capacity as my supreme guru (teacher).`
        },
        {
            sanskrit: `जो शत बार पाठ कर कोई ।
छूटहिं बंदि महा सुख होई ॥`,
            transliteration: `Jo sat bar path kare kohi ।
Chutehi bandhi maha sukh hohi ॥`,
            translation: `One who recites Chalisa one hundred times, becomes free from the bondage of life and death and enjoys the highest bliss at last.`
        },
        {
            sanskrit: `जो यह पढ़े हनुमान चालीसा ।
होय सिद्धि साखी गौरीसा ॥`,
            transliteration: `Jo yah padhe Hanuman Chalisa ।
Hoye siddhi sakhi Gaureesa ॥`,
            translation: `All those who recite Hanuman Chalisa (The forty Chaupais) regularly are sure to be benedicted. Such is the evidence of no less a witness as Bhagwan Sankar.`
        },
        {
            sanskrit: `तुलसीदास सदा हरि चेरा ।
कीजै नाथ हृदय महँ डेरा ॥`,
            transliteration: `Tulsidas sada hari chera ।
Keejai Das Hrdaye mein dera ॥`,
            translation: `Tulsidas as a bonded slave of the Divine Master, stays perpetually at his feet, he prays "Oh Lord! You enshrine within my heart & soul."`
        },
        {
            sanskrit: `पवनतनय संकट हरन मंगल मूर्ति रूप ।
राम लखन सीता सहित हृदय बसहु सुर भूप ॥`,
            transliteration: `Pavan tanay sankat harana mangal murti roop ।
Ram Lakhan Sita sahit hriday basahu sur bhuup ॥`,
            translation: `O Son of the Wind, remover of distress, embodiment of auspiciousness, reside in my heart along with Ram, Lakhan, and Sita, O King of Gods.`
        },
    ]
  },
  {
    id: '4',
    title: 'Aṣṭottara Śatanāmāvalī of Baṭuka Bhairava',
    audio: 'Ashtottara_bhairav.mp3',
    stanzas: [
        { sanskrit: `ॐ भैरवाय नमः।`, transliteration: `Om Bhairavaya Namah।`, translation: `Salutations to Bhairava, the terrifying one.` },
        { sanskrit: `ॐ भूतनाथाय नमः।`, transliteration: `Om Bhutanathaya Namah।`, translation: `Salutations to the Lord of all beings.` },
        { sanskrit: `ॐ भूतात्मने नमः।`, transliteration: `Om Bhutatmane Namah।`, translation: `Salutations to the soul of all beings.` },
        { sanskrit: `ॐ भूतभावनाय नमः।`, transliteration: `Om Bhutabhavanaya Namah।`, translation: `Salutations to the creator of all beings.` },
        { sanskrit: `ॐ क्षेत्रज्ञाय नमः।`, transliteration: `Om Kshetrajnaya Namah।`, translation: `Salutations to the knower of the field (body).` },
        { sanskrit: `ॐ क्षेत्रपालाय नमः।`, transliteration: `Om Kshetrapalaya Namah।`, translation: `Salutations to the protector of the field.` },
        { sanskrit: `ॐ क्षेत्रदाय नमः।`, transliteration: `Om Kshetradaya Namah।`, translation: `Salutations to the bestower of the field.` },
        { sanskrit: `ॐ क्षत्रियाय नमः।`, transliteration: `Om Kshatriyaya Namah।`, translation: `Salutations to the warrior.` },
        { sanskrit: `ॐ विराजे नमः।`, transliteration: `Om Viraje Namah।`, translation: `Salutations to the sovereign one.` },
        { sanskrit: `ॐ श्मशानवासिने नमः।`, transliteration: `Om Shmashanavasine Namah।`, translation: `Salutations to the one who dwells in cremation grounds.` },
        { sanskrit: `ॐ मांसाशिने नमः।`, transliteration: `Om Mamsashine Namah।`, translation: `Salutations to the eater of flesh.` },
        { sanskrit: `ॐ खर्पराशिने नमः।`, transliteration: `Om Kharparashine Namah।`, translation: `Salutations to the one who consumes from a skull-cup.` },
        { sanskrit: `ॐ स्मरान्तकाय नमः।`, transliteration: `Om Smarantakaya Namah।`, translation: `Salutations to the destroyer of desire (Kamadeva).` },
        { sanskrit: `ॐ रक्तपाय नमः।`, transliteration: `Om Raktapaya Namah।`, translation: `Salutations to the drinker of blood.` },
        { sanskrit: `ॐ पानपाय नमः।`, transliteration: `Om Panapaya Namah।`, translation: `Salutations to the drinker of libations.` },
        { sanskrit: `ॐ सिद्धाय नमः।`, transliteration: `Om Siddhaya Namah।`, translation: `Salutations to the perfected one.` },
        { sanskrit: `ॐ सिद्धिदाय नमः।`, transliteration: `Om Siddhidaya Namah।`, translation: `Salutations to the bestower of psychic powers.` },
        { sanskrit: `ॐ सिद्धिसेविताय नमः।`, transliteration: `Om Siddhisevitaya Namah।`, translation: `Salutations to the one served by siddhis.` },
        { sanskrit: `ॐ कङ्कालाय नमः।`, transliteration: `Om Kankalaya Namah।`, translation: `Salutations to the one who bears a skeleton.` },
        { sanskrit: `ॐ कालशमनाय नमः।`, transliteration: `Om Kalashamanaya Namah।`, translation: `Salutations to the pacifier of time/death.` },
        { sanskrit: `ॐ कलाकाष्ठातनवे नमः।`, transliteration: `Om Kalakashthatanave Namah।`, translation: `Salutations to the one whose body is time itself.` },
        { sanskrit: `ॐ कवये नमः।`, transliteration: `Om Kavaye Namah।`, translation: `Salutations to the poet/seer.` },
        { sanskrit: `ॐ त्रिनेत्राय नमः।`, transliteration: `Om Trinetraya Namah।`, translation: `Salutations to the three-eyed one.` },
        { sanskrit: `ॐ बहुनेत्राय नमः।`, transliteration: `Om Bahunetraya Namah।`, translation: `Salutations to the many-eyed one.` },
        { sanskrit: `ॐ पिङ्गललोचनाय नमः।`, transliteration: `Om Pingalalochanaya Namah।`, translation: `Salutations to the one with reddish-brown eyes.` },
        { sanskrit: `ॐ शूलपाणये नमः।`, transliteration: `Om Shulapanaye Namah।`, translation: `Salutations to the one holding a trident.` },
        { sanskrit: `ॐ खड्गपाणये नमः।`, transliteration: `Om Khadgapanaye Namah।`, translation: `Salutations to the one holding a sword.` },
        { sanskrit: `ॐ कङ्कालिने नमः।`, transliteration: `Om Kankaline Namah।`, translation: `Salutations to the one adorned with bones.` },
        { sanskrit: `ॐ धूम्रलोचनाय नमः।`, transliteration: `Om Dhumralochanaya Namah।`, translation: `Salutations to the one with smoke-colored eyes.` },
        { sanskrit: `ॐ अभीरवे नमः।`, transliteration: `Om Abhirave Namah।`, translation: `Salutations to the fearless one.` },
        { sanskrit: `ॐ भैरवीनाथाय नमः।`, transliteration: `Om Bhairavinathaya Namah।`, translation: `Salutations to the Lord of Bhairavi.` },
        { sanskrit: `ॐ भूतपाय नमः।`, transliteration: `Om Bhutapaya Namah।`, translation: `Salutations to the protector of beings.` },
        { sanskrit: `ॐ योगिनीपतये नमः।`, transliteration: `Om Yoginipataye Namah।`, translation: `Salutations to the Lord of the Yoginis.` },
        { sanskrit: `ॐ धनदाय नमः।`, transliteration: `Om Dhanadaya Namah।`, translation: `Salutations to the giver of wealth.` },
        { sanskrit: `ॐ धनहारिणे नमः।`, transliteration: `Om Dhanaharine Namah।`, translation: `Salutations to the remover of wealth.` },
        { sanskrit: `ॐ धनवते नमः।`, transliteration: `Om Dhanavate Namah।`, translation: `Salutations to the wealthy one.` },
        { sanskrit: `ॐ प्रतिभानवते नमः।`, transliteration: `Om Pratibhanavate Namah।`, translation: `Salutations to the one with brilliant intellect.` },
        { sanskrit: `ॐ नागहाराय नमः।`, transliteration: `Om Nagaharaya Namah।`, translation: `Salutations to the one with a necklace of snakes.` },
        { sanskrit: `ॐ नागकेशाय नमः।`, transliteration: `Om Nagakeshaya Namah।`, translation: `Salutations to the one with hair of snakes.` },
        { sanskrit: `ॐ व्योमकेशाय नमः।`, transliteration: `Om Vyomakeshaya Namah।`, translation: `Salutations to the one with sky-like hair.` },
        { sanskrit: `ॐ कपालभृते नमः।`, transliteration: `Om Kapalabhrite Namah।`, translation: `Salutations to the bearer of a skull.` },
        { sanskrit: `ॐ कालाय नमः।`, transliteration: `Om Kalaya Namah।`, translation: `Salutations to Time itself.` },
        { sanskrit: `ॐ कपालमालिने नमः।`, transliteration: `Om Kapalamaline Namah।`, translation: `Salutations to the one wearing a garland of skulls.` },
        { sanskrit: `ॐ कमनीयाय नमः।`, transliteration: `Om Kamaniyaya Namah।`, translation: `Salutations to the desirable one.` },
        { sanskrit: `ॐ कलानिधये नमः।`, transliteration: `Om Kalanidhaye Namah।`, translation: `Salutations to the repository of arts.` },
        { sanskrit: `ॐ त्रिलोचनाय नमः।`, transliteration: `Om Trilochanaya Namah।`, translation: `Salutations to the three-eyed one.` },
        { sanskrit: `ॐ ज्वलन्नेत्राय नमः।`, transliteration: `Om Jvalannetraya Namah।`, translation: `Salutations to the one with flaming eyes.` },
        { sanskrit: `ॐ त्रिशिखिने नमः।`, transliteration: `Om Trishikhine Namah।`, translation: `Salutations to the three-crested one.` },
        { sanskrit: `ॐ त्रिलोकपाय नमः।`, transliteration: `Om Trilokapaya Namah।`, translation: `Salutations to the protector of the three worlds.` },
        { sanskrit: `ॐ त्रिनेत्रतनयाय नमः।`, transliteration: `Om Trinetratanayaya Namah।`, translation: `Salutations to the son of the three-eyed one (Shiva).` },
        { sanskrit: `ॐ डिम्भाय नमः।`, transliteration: `Om Dimbhaya Namah।`, translation: `Salutations to the child form.` },
        { sanskrit: `ॐ शान्ताय नमः।`, transliteration: `Om Shantaya Namah।`, translation: `Salutations to the peaceful one.` },
        { sanskrit: `ॐ शान्तजनप्रियाय नमः।`, transliteration: `Om Shantajanapriyaya Namah।`, translation: `Salutations to the one dear to peaceful people.` },
        { sanskrit: `ॐ बटुकाय नमः।`, transliteration: `Om Batukaya Namah।`, translation: `Salutations to the boy form.` },
        { sanskrit: `ॐ बहुवेषाय नमः।`, transliteration: `Om Bahuveshaya Namah।`, translation: `Salutations to the one with many forms.` },
        { sanskrit: `ॐ खट्वाङ्गवरधारकाय नमः।`, transliteration: `Om Khatvangavaradharakaya Namah।`, translation: `Salutations to the bearer of the skull-topped staff.` },
        { sanskrit: `ॐ भूताध्यक्षाय नमः।`, transliteration: `Om Bhutadhyakshaya Namah।`, translation: `Salutations to the overseer of beings.` },
        { sanskrit: `ॐ पशुपतये नमः।`, transliteration: `Om Pashupataye Namah।`, translation: `Salutations to the Lord of all souls (Pashus).` },
        { sanskrit: `ॐ भिक्षुकाय नमः।`, transliteration: `Om Bhikshukaya Namah।`, translation: `Salutations to the mendicant.` },
        { sanskrit: `ॐ परिचारकाय नमः।`, transliteration: `Om Paricharakaya Namah।`, translation: `Salutations to the attendant.` },
        { sanskrit: `ॐ धूर्ताय नमः।`, transliteration: `Om Dhurtaya Namah।`, translation: `Salutations to the cunning one.` },
        { sanskrit: `ॐ दिगम्बराय नमः।`, transliteration: `Om Digambaraya Namah।`, translation: `Salutations to the sky-clad one.` },
        { sanskrit: `ॐ शौरिणे नमः।`, transliteration: `Om Shaurine Namah।`, translation: `Salutations to the heroic one.` },
        { sanskrit: `ॐ हरिणाय नमः।`, transliteration: `Om Harinaya Namah।`, translation: `Salutations to the one who is like a deer (or remover of sins).` },
        { sanskrit: `ॐ पाण्डुलोचनाय नमः।`, transliteration: `Om Pandulochanaya Namah।`, translation: `Salutations to the one with pale eyes.` },
        { sanskrit: `ॐ प्रशान्ताय नमः।`, transliteration: `Om Prashantaya Namah।`, translation: `Salutations to the supremely calm one.` },
        { sanskrit: `ॐ शान्तिदाय नमः।`, transliteration: `Om Shantidaya Namah।`, translation: `Salutations to the bestower of peace.` },
        { sanskrit: `ॐ सिद्धाय नमः।`, transliteration: `Om Siddhaya Namah।`, translation: `Salutations to the accomplished one.` },
        { sanskrit: `ॐ शङ्करप्रियबान्धवाय नमः।`, transliteration: `Om Shankarapriyabandhavaya Namah।`, translation: `Salutations to the dear kinsman of Shankara.` },
        { sanskrit: `ॐ अष्टमूर्तये नमः।`, transliteration: `Om Ashtamurtaye Namah।`, translation: `Salutations to the one with eight forms.` },
        { sanskrit: `ॐ निधीशाय नमः।`, transliteration: `Om Nidhishaya Namah।`, translation: `Salutations to the lord of treasures.` },
        { sanskrit: `ॐ ज्ञानचक्षुषे नमः।`, transliteration: `Om Jnanachakshushe Namah।`, translation: `Salutations to the one whose eye is knowledge.` },
        { sanskrit: `ॐ तपोमयाय नमः।`, transliteration: `Om Tapomayaya Namah।`, translation: `Salutations to the one full of austerity.` },
        { sanskrit: `ॐ अष्टाधाराय नमः।`, transliteration: `Om Ashtadharaya Namah।`, translation: `Salutations to the support of the eight elements.` },
        { sanskrit: `ॐ षडाधाराय नमः।`, transliteration: `Om Shadadharaya Namah।`, translation: `Salutations to the support of the six chakras.` },
        { sanskrit: `ॐ सर्पयुक्ताय नमः।`, transliteration: `Om Sarpayuktaya Namah।`, translation: `Salutations to the one adorned with serpents.` },
        { sanskrit: `ॐ शिखीसख्ये नमः।`, transliteration: `Om Shikhisakhye Namah।`, translation: `Salutations to the friend of fire (or peacocks).` },
        { sanskrit: `ॐ भूधराय नमः।`, transliteration: `Om Bhudharaya Namah।`, translation: `Salutations to the supporter of the earth.` },
        { sanskrit: `ॐ भूधराधीशाय नमः।`, transliteration: `Om Bhudharadhishaya Namah।`, translation: `Salutations to the lord of the earth-supporter (mountains).` },
        { sanskrit: `ॐ भूपतये नमः।`, transliteration: `Om Bhupataye Namah।`, translation: `Salutations to the lord of the earth.` },
        { sanskrit: `ॐ भूधरात्मजाय नमः।`, transliteration: `Om Bhudharatmajaya Namah।`, translation: `Salutations to the son of the mountain-bearer.` },
        { sanskrit: `ॐ कङ्कालधारिणे नमः।`, transliteration: `Om Kankaladharine Namah।`, translation: `Salutations to the bearer of the skeleton.` },
        { sanskrit: `ॐ मुण्डिने नमः।`, transliteration: `Om Mundine Namah।`, translation: `Salutations to the tonsured one.` },
        { sanskrit: `ॐ नागयज्ञोपवीतकाय नमः।`, transliteration: `Om Nagayajnopavitakaya Namah।`, translation: `Salutations to the one with a snake as a sacred thread.` },
        { sanskrit: `ॐ जृम्भणाय नमः।`, transliteration: `Om Jrimbhanaya Namah।`, translation: `Salutations to the one who causes yawning/expansion.` },
        { sanskrit: `ॐ मोहनाय नमः।`, transliteration: `Om Mohanaya Namah।`, translation: `Salutations to the bewilderer.` },
        { sanskrit: `ॐ स्तम्भिने नमः।`, transliteration: `Om Stambhine Namah।`, translation: `Salutations to the one who paralyzes.` },
        { sanskrit: `ॐ मारणाय नमः।`, transliteration: `Om Maranaya Namah।`, translation: `Salutations to the one who causes death.` },
        { sanskrit: `ॐ क्षोभणाय नमः।`, transliteration: `Om Kshobhanaya Namah।`, translation: `Salutations to the one who causes agitation.` },
        { sanskrit: `ॐ शुद्धाय नमः।`, transliteration: `Om Shuddhaya Namah।`, translation: `Salutations to the pure one.` },
        { sanskrit: `ॐ नीलाञ्जनप्रख्याय नमः।`, transliteration: `Om Nilanjanaprakhyaya Namah।`, translation: `Salutations to the one who resembles blue collyrium.` },
        { sanskrit: `ॐ दैत्यघ्ने नमः।`, transliteration: `Om Daityaghne Namah।`, translation: `Salutations to the slayer of demons.` },
        { sanskrit: `ॐ मुण्डभूषिताय नमः।`, transliteration: `Om Mundabhushitaya Namah।`, translation: `Salutations to the one adorned with skulls.` },
        { sanskrit: `ॐ बलिभुजे नमः।`, transliteration: `Om Balibhuje Namah।`, translation: `Salutations to the enjoyer of offerings.` },
        { sanskrit: `ॐ बलिभुङ्नाथाय नमः।`, transliteration: `Om Balibhunnathaya Namah।`, translation: `Salutations to the lord of the enjoyers of offerings.` },
        { sanskrit: `ॐ बालाय नमः।`, transliteration: `Om Balaya Namah।`, translation: `Salutations to the child.` },
        { sanskrit: `ॐ बालपराक्रमाय नमः।`, transliteration: `Om Balaparakramaya Namah।`, translation: `Salutations to the one with child-like valor.` },
        { sanskrit: `ॐ सर्वापत्तारणाय नमः।`, transliteration: `Om Sarvapattaranaya Namah।`, translation: `Salutations to the savior from all calamities.` },
        { sanskrit: `ॐ दुर्गाय नमः।`, transliteration: `Om Durgaya Namah।`, translation: `Salutations to the one who is difficult to attain (or remover of difficulties).` },
        { sanskrit: `ॐ दुष्टभूतनिषेविताय नमः।`, transliteration: `Om Dushtabhutanishevitaya Namah।`, translation: `Salutations to the one served by wicked beings.` },
        { sanskrit: `ॐ कामिने नमः।`, transliteration: `Om Kamine Namah।`, translation: `Salutations to the loving one.` },
        { sanskrit: `ॐ कलानिधये नमः।`, transliteration: `Om Kalanidhaye Namah।`, translation: `Salutations to the treasure of arts.` },
        { sanskrit: `ॐ कान्ताय नमः।`, transliteration: `Om Kantaya Namah।`, translation: `Salutations to the beloved one.` },
        { sanskrit: `ॐ कामिनीवशकृद्वशिने नमः।`, transliteration: `Om Kaminivashakridvashine Namah।`, translation: `Salutations to the one who controls and is controlled by the beloved.` },
        { sanskrit: `ॐ सर्वसिद्धिप्रदाय नमः।`, transliteration: `Om Sarvasiddhipradaya Namah।`, translation: `Salutations to the bestower of all accomplishments.` },
        { sanskrit: `ॐ वैद्याय नमः।`, transliteration: `Om Vaidyaya Namah।`, translation: `Salutations to the supreme physician.` },
        { sanskrit: `ॐ प्रभवे नमः।`, transliteration: `Om Prabhave Namah।`, translation: `Salutations to the supreme lord.` },
        { sanskrit: `ॐ विष्णवे नमः।`, transliteration: `Om Vishnave Namah।`, translation: `Salutations to the all-pervading one.` },
    ]
  }
];