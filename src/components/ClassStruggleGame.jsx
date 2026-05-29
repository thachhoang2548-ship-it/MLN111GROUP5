import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, Heart, TrendingUp, AlertTriangle, Play, RefreshCw, MessageSquare,
  User, CheckCircle2, Star, Coins, UserCheck, ShieldAlert, Award
} from 'lucide-react';
import { sound } from './SoundManager';

// ==========================================
// DATA DEFINITIONS (ROLES & SCENARIOS)
// ==========================================

const rolesData = [
  {
    id: 'slave',
    name: 'Nô lệ (Slave)',
    era: 'Xã hội Chiếm hữu Nô lệ',
    desc: 'Lao dịch không giới hạn trong các mỏ đá, điền trang. Bị xem như vật sở hữu của chủ nô.',
    meansOfProduction: 'Không sở hữu gì cả (Bản thân là tài sản của người khác)',
    stats: { wealth: 0, freedom: 2, conditions: 5, status: 5 },
    event: {
      question: 'Chủ nô đánh đập dã man một người bạn của bạn vì làm vỡ dụng cụ. Bạn sẽ làm gì?',
      choices: [
        {
          text: 'Tham gia âm mưu nổi dậy, trốn chạy đêm nay.',
          feedback: 'Bạn đào tẩu thành công cùng một nhóm nhỏ, nhưng bị lính tuần La Mã săn đuổi. Tự do của bạn tăng vọt, nhưng vị thế xã hội vô cùng nguy hiểm!',
          changes: { wealth: 0, freedom: 60, conditions: 20, status: 20 }
        },
        {
          text: 'Chấp nhận chịu đựng, tiếp tục cúi đầu làm việc.',
          feedback: 'Bạn an toàn tính mạng nhưng thể chất hao mòn. Điều kiện lao động giảm sút trầm trọng. Bạn cảm nhận sâu sắc sự tha hóa con người.',
          changes: { wealth: 0, freedom: 2, conditions: 2, status: 2 }
        },
        {
          text: 'Đứng ra nhận lỗi thay để làm dịu cơn thịnh nộ.',
          feedback: 'Bạn bị quất roi tàn bạo, mất đi 50% sức khỏe, nhưng nhận được sự nể trọng âm thầm từ các nô lệ khác. Uy tín của bạn tăng.',
          changes: { wealth: 0, freedom: 2, conditions: 1, status: 40 }
        }
      ]
    }
  },
  {
    id: 'peasant',
    name: 'Nông dân (Peasant)',
    era: 'Chế độ Phong kiến',
    desc: 'Cày cấy trên ruộng đất của Lãnh chúa phong kiến. Phải nộp tô thuế nặng nề và làm lao dịch.',
    meansOfProduction: 'Không sở hữu đất đai (Chỉ có nông cụ thô sơ tự chế)',
    stats: { wealth: 15, freedom: 20, conditions: 25, status: 20 },
    event: {
      question: 'Năm nay mất mùa do thiên tai, nhưng địa chủ vẫn ép nộp đủ 70% sản lượng làm tô thuế. Bạn làm gì?',
      choices: [
        {
          text: 'Vay nặng lãi của quý tộc để nộp đủ tô thuế.',
          feedback: 'Bạn giữ được mảnh đất canh tác nhưng rơi vào bẫy nợ nần truyền kiếp. Tài sản của bạn giảm về âm.',
          changes: { wealth: 2, freedom: 10, conditions: 20, status: 15 }
        },
        {
          text: 'Bỏ trốn lên thành thị làm thợ thủ công tự do.',
          feedback: 'Bạn thoát ly khỏi sự kiềm tỏa của địa chủ, gia nhập hàng ngũ thị dân tự do. Tự do tăng mạnh nhưng cuộc sống mới bấp bênh.',
          changes: { wealth: 25, freedom: 50, conditions: 30, status: 35 }
        },
        {
          text: 'Liên kết với dân làng tổ chức chống nộp tô.',
          feedback: 'Địa chủ sai lính canh xuống đàn áp. Cuộc xung đột vũ trang nổ ra. Giai cấp mâu thuẫn đẩy lên cực đỉnh. Bạn trở thành thủ lĩnh nghĩa quân!',
          changes: { wealth: 10, freedom: 30, conditions: 15, status: 70 }
        }
      ]
    }
  },
  {
    id: 'worker',
    name: 'Công nhân (Worker)',
    era: 'Chủ nghĩa Tư bản',
    desc: 'Bán sức lao động trong nhà máy công nghiệp. Nhận đồng lương ít ỏi và chịu áp lực tăng ca liên tục.',
    meansOfProduction: 'Không có tư liệu sản xuất (Chỉ sở hữu sức lao động cá nhân)',
    stats: { wealth: 30, freedom: 50, conditions: 30, status: 30 },
    event: {
      question: 'Chủ nhà máy tăng giờ làm từ 12 lên 16 tiếng nhưng giảm lương để cạnh tranh thị trường. Bạn xử trí thế nào?',
      choices: [
        {
          text: 'Vận động thành lập Công đoàn, đình công bãi thị.',
          feedback: 'Nhà máy bị đình trệ. Cảnh sát can thiệp, nhưng công đoàn của bạn đã buộc chủ doanh nghiệp thỏa hiệp rút ngắn giờ làm. Tự do & vị thế tăng!',
          changes: { wealth: 25, freedom: 65, conditions: 50, status: 60 }
        },
        {
          text: 'Chấp nhận tăng ca để tránh bị sa thải.',
          feedback: 'Bạn giữ được công việc, nhưng kiệt quệ thể xác. Giá trị thặng dư của bạn bị vắt kiệt tối đa cho nhà tư bản.',
          changes: { wealth: 35, freedom: 30, conditions: 10, status: 20 }
        },
        {
          text: 'Phá hoại máy móc nhà xưởng (Phong trào đập phá máy móc).',
          feedback: 'Hành động phản kháng tự phát phá hỏng dây chuyền sản xuất. Bạn bị đuổi việc và truy nã. Mâu thuẫn giai cấp đẩy lên tột cùng.',
          changes: { wealth: 5, freedom: 10, conditions: 15, status: 40 }
        }
      ]
    }
  },
  {
    id: 'bourgeoisie',
    name: 'Chủ nô (Slave Owner)',
    era: 'Xã hội Chiếm hữu Nô lệ',
    desc: 'Sở hữu hàng trăm nô lệ, đất đai trù phú và quyền lực chính trị tuyệt đối tại Viện Nguyên Lão.',
    meansOfProduction: 'Sở hữu tư nhân tuyệt đối mọi tư liệu sản xuất và nô lệ',
    stats: { wealth: 95, freedom: 95, conditions: 95, status: 95 },
    event: {
      question: 'Phát hiện một nhóm nô lệ đang tích trữ nông cụ để lập mưu nổi loạn khởi nghĩa. Bạn làm gì?',
      choices: [
        {
          text: 'Ra lệnh xử tử thị uy ngay lập tức.',
          feedback: 'Các nô lệ khiếp sợ phục tùng trở lại. Tài sản và địa vị của bạn được bảo toàn vững chắc.',
          changes: { wealth: 95, freedom: 90, conditions: 95, status: 98 }
        },
        {
          text: 'Cải thiện nhẹ chế độ ăn uống để xoa dịu mâu thuẫn.',
          feedback: 'Nô lệ bớt phẫn nộ lâm thời, nhưng chi phí tăng nhẹ làm giảm một chút tích lũy tài sản của bạn.',
          changes: { wealth: 88, freedom: 95, conditions: 95, status: 90 }
        }
      ]
    }
  },
  {
    id: 'landlord',
    name: 'Quý tộc / Địa chủ (Landlord)',
    era: 'Chế độ Phong kiến',
    desc: 'Quản lý thái ấp, thu tô thuế nông dân và hưởng các đặc quyền thế tập từ triều đình.',
    meansOfProduction: 'Sở hữu toàn bộ ruộng đất canh tác trong vùng lãnh địa',
    stats: { wealth: 85, freedom: 90, conditions: 90, status: 90 },
    event: {
      question: 'Triều đình yêu cầu trưng thu thêm tô thuế để chuẩn bị cho chiến tranh. Bạn đẩy gánh nặng này thế nào?',
      choices: [
        {
          text: 'Ép nông nô đóng thêm 20% thuế sản lượng.',
          feedback: 'Hầu bao của bạn không bị ảnh hưởng, nhưng sự oán hận của nông nô dâng cao, nguy cơ bùng nổ bạo động.',
          changes: { wealth: 90, freedom: 90, conditions: 90, status: 80 }
        },
        {
          text: 'Tự bỏ tiền túi đóng thuế để đổi lấy lòng trung thành.',
          feedback: 'Lòng trung thành của nông dân tăng giúp lãnh địa yên bình, song tài sản quý tộc của bạn sụt giảm đáng kể.',
          changes: { wealth: 70, freedom: 90, conditions: 90, status: 95 }
        }
      ]
    }
  },
  {
    id: 'capitalist',
    name: 'Nhà Tư bản (Capitalist)',
    era: 'Chủ nghĩa Tư bản',
    desc: 'Sở hữu tập đoàn công nghiệp, kiểm soát dây chuyền sản xuất lớn và tối đa hóa lợi nhuận thặng dư.',
    meansOfProduction: 'Sở hữu tư nhân đối với toàn bộ nhà máy, cổ phần và dây chuyền kỹ thuật',
    stats: { wealth: 98, freedom: 95, conditions: 95, status: 90 },
    event: {
      question: 'Công nhân đình công đòi giảm giờ làm xuống 8 tiếng/ngày và tăng lương. Bạn phản ứng ra sao?',
      choices: [
        {
          text: 'Thuê cảnh sát và lực lượng bảo an trấn áp cuộc đình công.',
          feedback: 'Cuộc đình công bị dập tắt, công nhân phải quay lại làm việc. Lợi nhuận phục hồi nhưng xung đột giai cấp âm ỉ.',
          changes: { wealth: 95, freedom: 95, conditions: 95, status: 85 }
        },
        {
          text: 'Đồng ý nhượng bộ một phần, tăng lương 5% và giữ nguyên giờ làm.',
          feedback: 'Công nhân tạm chấp nhận. Lợi nhuận của bạn giảm nhẹ nhưng doanh nghiệp hoạt động ổn định không bị đình trệ.',
          changes: { wealth: 90, freedom: 95, conditions: 95, status: 92 }
        },
        {
          text: 'Đầu tư mua máy móc tự động hóa để sa thải bớt công nhân đình công.',
          feedback: 'Năng suất lao động tăng vọt nhờ công nghệ mới, giảm phụ thuộc vào sức lao động thủ công. Bạn tích lũy thêm thặng dư lớn.',
          changes: { wealth: 99, freedom: 95, conditions: 95, status: 95 }
        }
      ]
    }
  }
];

const scenarios = [
  {
    id: 1,
    title: 'Quyết sách về Luật Lao Động',
    desc: 'Làn sóng công nhân đình công nổ ra trên diện rộng, đòi giảm giờ làm xuống 40 giờ/tuần và tăng lương tối thiểu thêm 25% để bù đắp lạm phát. Giới chủ phản đối kịch liệt vì lo ngại giảm sức cạnh tranh quốc gia.',
    choices: [
      {
        text: 'Đáp ứng toàn bộ yêu sách: Giảm giờ làm, tăng lương tối thiểu.',
        result: 'Nhân dân phấn khởi, mâu thuẫn giai cấp giảm mạnh, nhưng giới đầu tư rút vốn nhẹ do chi phí tăng.',
        changes: { conflict: -25, stability: 15, inequality: -20 }
      },
      {
        text: 'Sử dụng bảo an giải tán đình công, cấm thành lập công đoàn.',
        result: 'Cuộc đình công bị dập tắt tạm thời nhưng xung đột bùng phát ngầm dữ dội. Bất bình đẳng tăng cao.',
        changes: { conflict: 30, stability: -25, inequality: 15 }
      },
      {
        text: 'Đàm phán hòa giải: Chỉ tăng lương 10% và giữ nguyên giờ làm.',
        result: 'Cả hai bên đều không hoàn toàn thỏa mãn, mâu thuẫn giảm nhẹ nhưng bất bình đẳng không đổi.',
        changes: { conflict: -5, stability: 5, inequality: 0 }
      }
    ]
  },
  {
    id: 2,
    title: 'Thuế tài sản đối với giới siêu giàu',
    desc: 'Đề xuất áp thuế tài sản lũy tiến lên đến 45% đối với các cá nhân có tài sản trên 100 tỷ đồng để tài trợ phúc lợi xã hội, y tế và giáo dục công miễn phí.',
    choices: [
      {
        text: 'Thông qua luật áp thuế tài sản cao.',
        result: 'Bất bình đẳng giảm mạnh. Người nghèo có thêm cơ hội tiếp cận giáo dục, song giới tư bản đe dọa dịch chuyển nhà máy.',
        changes: { conflict: -20, stability: 20, inequality: -30 }
      },
      {
        text: 'Bác bỏ dự luật để thu hút dòng vốn đầu tư.',
        result: 'Các nhà tài phiệt hài lòng, nhưng các tổ chức lao động biểu tình rầm rộ phản đối chính quyền bắt tay với tư bản.',
        changes: { conflict: 25, stability: -20, inequality: 20 }
      },
      {
        text: 'Chỉ áp thuế tượng trưng 5% kèm các khoản giảm trừ.',
        result: 'Tác động thực tế không đáng kể. Người dân thất vọng vì chính sách mang tính thỏa hiệp nửa vời.',
        changes: { conflict: 10, stability: -5, inequality: 5 }
      }
    ]
  },
  {
    id: 3,
    title: 'Quyết định trước Đe dọa Độc lập Kinh tế từ bên ngoài',
    desc: 'Một siêu tập đoàn đa quốc gia yêu cầu miễn thuế tài nguyên trọn đời và đặc quyền tự trị pháp lý tại các khu công nghiệp trọng điểm để đầu tư. Giai cấp tư bản muốn nhượng bộ để hưởng lợi nhuận liên doanh, còn nhân dân lo sợ mất độc lập dân tộc.',
    choices: [
      {
        text: 'Từ chối nhượng bộ, quốc hữu hóa tài nguyên thiên nhiên dưới quyền tự chủ của quốc gia.',
        result: 'Khơi dậy lòng yêu nước, khối liên minh công-nông-trí thức được thắt chặt, đoàn kết dân tộc tăng vọt, mâu thuẫn giai cấp giảm bớt.',
        changes: { conflict: -25, stability: 30, inequality: -15 }
      },
      {
        text: 'Nhượng bộ hoàn toàn để thu hút FDI bằng mọi giá.',
        result: 'Kinh tế tăng trưởng số liệu ảo nhưng chủ quyền quốc gia bị xâm phạm, công nhân bản địa bị bóc lột kép bởi tư bản nội và ngoại.',
        changes: { conflict: 35, stability: -30, inequality: 25 }
      },
      {
        text: 'Thỏa hiệp: Thuế tài nguyên ở mức trung bình, buộc tập đoàn tuyển dụng 80% quản lý là người bản địa.',
        result: 'Giảm thiểu thiệt hại, bảo vệ được một phần lợi ích dân tộc song bất công lao động vẫn chưa được giải quyết dứt điểm.',
        changes: { conflict: 5, stability: 5, inequality: 5 }
      }
    ]
  },
  {
    id: 4,
    title: 'Hợp pháp hóa Công đoàn độc lập',
    desc: 'Các nhóm công nhân công nghệ và tài xế công nghệ (gig-workers) nỗ lực thành lập các tổ chức tự quản công đoàn độc lập để thương lượng tập thể, vượt qua sự cấm cản của các tập đoàn đa quốc gia.',
    choices: [
      {
        text: 'Hợp pháp hóa hoàn toàn quyền tự lập công đoàn.',
        result: 'Công nhân đoàn kết tốt, tự do thương lượng tăng. Bất bình đẳng giảm, mâu thuẫn xã hội đi vào đối thoại hòa bình.',
        changes: { conflict: -15, stability: 15, inequality: -15 }
      },
      {
        text: 'Cấm công đoàn tự phát, ép tham gia công đoàn chịu quản lý nhà nước.',
        result: 'Hoạt động công đoàn bị bóp nghẹt. Sự bức xúc xã hội tăng cao, nguy cơ biểu tình tự phát bất hợp pháp.',
        changes: { conflict: 20, stability: -15, inequality: 10 }
      },
      {
        text: 'Để mặc các doanh nghiệp tự thỏa thuận với người lao động.',
        result: 'Các doanh nghiệp dùng ưu thế sa thải để ép công nhân ký cam kết không tham gia công đoàn.',
        changes: { conflict: 15, stability: -10, inequality: 15 }
      }
    ]
  }
];

export default function ClassStruggleGame({ audioEnabled }) {
  // Navigation / Tab state: 'roleplay' (Nhập vai cá nhân) or 'policy' (Giả lập vĩ mô)
  const [activeTab, setActiveTab] = useState('roleplay');

  // ==========================================
  // STATE & LOGIC: ROLEPLAY SECTION (Cá nhân)
  // ==========================================
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStats, setCurrentStats] = useState(null);
  const [activeChoice, setActiveChoice] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRoleSelect = (role) => {
    if (audioEnabled) {
      sound.playTick();
      sound.playDrone();
    }
    setSelectedRole(role);
    setCurrentStats({ ...role.stats });
    setActiveChoice(null);
    setFeedbackText('');
  };

  const handleChoice = (choice, idx) => {
    if (audioEnabled) {
      if (choice.changes.freedom < currentStats.freedom || choice.changes.wealth < currentStats.wealth) {
        sound.playClang();
      } else {
        sound.playTrumpet();
      }
    }
    setActiveChoice(idx);
    setCurrentStats(choice.changes);
    setFeedbackText(choice.feedback);
  };

  const handleRoleReset = () => {
    if (audioEnabled) sound.playTick();
    setSelectedRole(null);
    setCurrentStats(null);
    setActiveChoice(null);
    setFeedbackText('');
  };


  // ==========================================
  // STATE & LOGIC: POLICY SIMULATOR (Vĩ mô)
  // ==========================================
  const [round, setRound] = useState(0);
  const [conflict, setConflict] = useState(60);
  const [stability, setStability] = useState(50);
  const [inequality, setInequality] = useState(70);
  const [gameEnded, setGameEnded] = useState(false);
  const [lastResult, setLastResult] = useState('');

  const clampValue = (val) => Math.max(0, Math.min(100, val));

  const handleChoiceSelect = (choice) => {
    if (audioEnabled) {
      if (choice.changes.conflict > 0) sound.playClang();
      else sound.playTrumpet();
    }

    setConflict(prev => clampValue(prev + choice.changes.conflict));
    setStability(prev => clampValue(prev + choice.changes.stability));
    setInequality(prev => clampValue(prev + choice.changes.inequality));
    setLastResult(choice.result);

    if (round < scenarios.length - 1) {
      setRound(prev => prev + 1);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    if (audioEnabled) sound.playTick();
    setRound(0);
    setConflict(60);
    setStability(50);
    setInequality(70);
    setGameEnded(false);
    setLastResult('');
  };

  const getPropagandaNews = () => {
    if (conflict > 75) {
      return 'TIN KHẨN: Đình công lớn nổ ra tại khu công nghiệp trung tâm! Hàng vạn lao động bãi công đòi lật đổ giới quản lý...';
    }
    if (inequality > 80) {
      return 'THỐNG KÊ: Khoảng cách giàu nghèo đạt kỷ lục, 1% người giàu nắm giữ khối lượng tài sản gấp 100 lần nửa dưới dân số...';
    }
    if (stability < 35) {
      return 'BÁO CÁO CẢNH BÁO: Chỉ số an ninh xã hội sụt giảm nghiêm trọng, nguy cơ bất ổn hiến pháp tăng cao...';
    }
    return 'BẢN TIN: Các tổ chức xã hội kêu gọi đối thoại quốc gia nhằm hòa hợp giai cấp và xây dựng khối đoàn kết dân tộc...';
  };

  const changeTab = (tab) => {
    if (audioEnabled) sound.playTick();
    setActiveTab(tab);
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 z-10 relative">
      {/* Page Header */}
      <div className="text-center mb-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-soviet-red/30 bg-soviet-red/10 text-soviet-gold text-xs uppercase tracking-widest font-semibold mb-4"
        >
          <Award className="w-3.5 h-3.5 text-soviet-red animate-pulse" />
          Học thuyết Đấu tranh Giai cấp & Dân tộc
        </motion.div>
        
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-soviet-beige mb-4">
          Hệ Thống Mô Phỏng & Giả Lập
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
          Tìm hiểu mâu thuẫn giai cấp qua hai lăng kính: nhập vai trải nghiệm đời sống của cá nhân trong xã hội cũ, 
          và đưa ra các quyết sách vĩ mô điều tiết xã hội của một nhà lập pháp.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => changeTab('roleplay')}
          className={`px-5 py-3 rounded-xl border text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
            activeTab === 'roleplay'
              ? 'bg-gradient-to-r from-soviet-red to-red-700 text-white border-soviet-gold/50 shadow-lg shadow-red-900/30'
              : 'bg-[#1b1b22] text-gray-400 border-soviet-border hover:border-soviet-gold/30 hover:text-soviet-beige'
          }`}
        >
          <User className="w-4 h-4" />
          Nhập Vai Giai Cấp (Cá Nhân)
        </button>
        
        <button
          onClick={() => changeTab('policy')}
          className={`px-5 py-3 rounded-xl border text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
            activeTab === 'policy'
              ? 'bg-gradient-to-r from-soviet-red to-red-700 text-white border-soviet-gold/50 shadow-lg shadow-red-900/30'
              : 'bg-[#1b1b22] text-gray-400 border-soviet-border hover:border-soviet-gold/30 hover:text-soviet-beige'
          }`}
        >
          <Radio className="w-4 h-4" />
          Giả Lập Quyết Sách (Vĩ Mô)
        </button>
      </div>

      {/* Dynamic Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'roleplay' ? (
          // ==========================================
          // RENDER: ROLEPLAY SIMULATION
          // ==========================================
          <motion.div
            key="roleplay-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {!selectedRole ? (
              /* Grid of Roles */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rolesData.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className="bg-[#1b1b22] hover:bg-[#22222c] border border-soviet-border hover:border-soviet-gold/50 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between shadow-lg hover:shadow-2xl group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-soviet-red font-bold">
                          {role.era}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-[#14141a] flex items-center justify-center text-soviet-gold group-hover:bg-soviet-red group-hover:text-white transition-colors duration-300">
                          <UserCheck className="w-4 h-4" />
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-soviet-beige group-hover:text-soviet-gold transition-colors mb-2">
                        {role.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {role.desc}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-soviet-border text-xs text-gray-400">
                      <span className="font-semibold text-soviet-gold">Tư liệu sản xuất:</span> {role.meansOfProduction}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Roleplay Dashboard */
              <div className="bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 shadow-2xl relative">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-soviet-border pb-6 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-soviet-red font-bold">
                      Bảng Điều Khiển Mô Phỏng / {selectedRole.era}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-soviet-gold mt-1">
                      {selectedRole.name}
                    </h3>
                  </div>
                  <button
                    onClick={handleRoleReset}
                    className="flex items-center gap-2 bg-[#14141a] hover:bg-soviet-red hover:text-white border border-soviet-border px-4 py-2 rounded-lg text-sm transition-colors text-gray-400 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Đổi vai trò khác
                  </button>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Gauges Side */}
                  <div className="lg:col-span-5 bg-[#14141a] border border-soviet-border rounded-xl p-6 space-y-6">
                    <h4 className="text-sm font-bold text-soviet-beige uppercase tracking-wider mb-4 border-b border-soviet-border pb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-soviet-gold" /> Chỉ số trạng thái cá nhân
                    </h4>
                    
                    {/* Gauge 1: Wealth */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 flex items-center gap-1"><Coins className="w-3.5 h-3.5" /> Tài sản / Thu nhập</span>
                        <span className="font-semibold text-white">{currentStats.wealth}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-500" 
                          style={{ width: `${currentStats.wealth}%` }}
                        />
                      </div>
                    </div>

                    {/* Gauge 2: Freedom */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Quyền tự do & Dân sự</span>
                        <span className="font-semibold text-white">{currentStats.freedom}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500" 
                          style={{ width: `${currentStats.freedom}%` }}
                        />
                      </div>
                    </div>

                    {/* Gauge 3: Working Conditions */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Điều kiện làm việc</span>
                        <span className="font-semibold text-white">{currentStats.conditions}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                        <div 
                          className="h-full bg-cyan-500 transition-all duration-500" 
                          style={{ width: `${currentStats.conditions}%` }}
                        />
                      </div>
                    </div>

                    {/* Gauge 4: Social Status */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400 flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Địa vị xã hội / Uy tín</span>
                        <span className="font-semibold text-white">{currentStats.status}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden border border-soviet-border">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-500" 
                          style={{ width: `${currentStats.status}%` }}
                        />
                      </div>
                    </div>

                    {/* Means of production info */}
                    <div className="mt-4 p-4 bg-[#1b1b22] border border-soviet-border rounded-lg text-xs">
                      <div className="text-soviet-gold font-bold uppercase mb-1">Quan hệ sở hữu tư liệu sản xuất:</div>
                      <p className="text-gray-300 italic">{selectedRole.meansOfProduction}</p>
                    </div>
                  </div>

                  {/* Event & Story Side */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    {/* Event Card */}
                    <div className="bg-[#14141a] border border-soviet-border rounded-xl p-6 mb-6">
                      <span className="inline-block bg-soviet-red/20 text-soviet-red text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3 border border-soviet-red/30 animate-pulse">
                        Tình huống lịch sử xảy ra
                      </span>
                      <h4 className="text-lg font-bold text-soviet-beige leading-snug">
                        {selectedRole.event.question}
                      </h4>
                    </div>

                    {/* Choices */}
                    <div className="space-y-3">
                      {selectedRole.event.choices.map((choice, idx) => {
                        const isSelected = activeChoice === idx;
                        return (
                          <button
                            key={idx}
                            disabled={activeChoice !== null}
                            onClick={() => handleChoice(choice, idx)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-soviet-red/20 border-soviet-gold text-white'
                                : activeChoice !== null
                                  ? 'opacity-40 border-soviet-border text-gray-500 cursor-not-allowed'
                                  : 'bg-[#1b1b22] hover:bg-[#22222a] border-soviet-border hover:border-soviet-gold/50 text-gray-300'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-xs ${
                              isSelected ? 'border-soviet-gold bg-soviet-gold text-soviet-dark font-bold' : 'border-gray-500 text-gray-400'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-sm font-semibold">{choice.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Presentation */}
                    <AnimatePresence>
                      {feedbackText && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 p-4 bg-[#1b1b22] border-l-4 border-soviet-gold rounded-r-lg text-sm text-gray-300 leading-relaxed shadow-lg"
                        >
                          <span className="font-bold text-soviet-gold block mb-1">Kết quả & Phân tích lý thuyết:</span>
                          {feedbackText}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          // ==========================================
          // RENDER: POLICY SIMULATOR
          // ==========================================
          <motion.div
            key="policy-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Dynamic Scrolling News Ticker */}
            <div className="w-full bg-red-950/20 border border-soviet-red/30 rounded-lg p-2.5 mb-8 flex items-center overflow-hidden gap-4 text-xs font-mono">
              <span className="bg-soviet-red text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse flex-shrink-0">
                Radio Công Nhân
              </span>
              <div className="relative w-full overflow-hidden h-5">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute whitespace-nowrap text-soviet-gold font-bold"
                >
                  {getPropagandaNews()}
                </motion.div>
              </div>
            </div>

            {/* Main Game Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Side: Status Gauges */}
              <div className="lg:col-span-4 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <h3 className="text-lg font-serif font-bold text-soviet-beige mb-6 border-b border-soviet-border pb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-soviet-gold" /> Chỉ số đo lường xã hội
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Conflict Meter */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">🔥 Mâu thuẫn giai cấp</span>
                        <span className={`font-bold ${conflict > 70 ? 'text-red-500 animate-pulse' : 'text-gray-300'}`}>{conflict}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                        <motion.div
                          animate={{ width: `${conflict}%` }}
                          transition={{ type: 'spring', stiffness: 80 }}
                          className={`h-full rounded-full ${
                            conflict > 75 
                              ? 'bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                              : 'bg-gradient-to-r from-red-900 to-red-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Stability / National Unity Meter */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">⚖️ Ổn định & Đoàn kết dân tộc</span>
                        <span className={`font-bold ${stability < 30 ? 'text-orange-500 animate-pulse' : 'text-gray-300'}`}>{stability}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                        <motion.div
                          animate={{ width: `${stability}%` }}
                          transition={{ type: 'spring', stiffness: 80 }}
                          className={`h-full rounded-full ${
                            stability < 35 
                              ? 'bg-gradient-to-r from-orange-700 to-orange-500' 
                              : 'bg-gradient-to-r from-green-800 to-green-600'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Inequality Meter */}
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">📊 Bất bình đẳng kinh tế</span>
                        <span className={`font-bold ${inequality > 75 ? 'text-amber-500 animate-pulse' : 'text-gray-300'}`}>{inequality}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#14141a] rounded-full overflow-hidden border border-soviet-border">
                        <motion.div
                          animate={{ width: `${inequality}%` }}
                          transition={{ type: 'spring', stiffness: 80 }}
                          className="h-full bg-gradient-to-r from-yellow-800 to-yellow-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#14141a] border border-soviet-border rounded-xl text-xs text-gray-400">
                  {conflict > 75 && (
                    <div className="flex items-start gap-2 text-red-500">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>
                        <strong>Cảnh báo cách mạng:</strong> Mâu thuẫn giai cấp quá cao sẽ đẩy xã hội vào các cuộc nổi dậy vũ trang và đình công toàn quốc!
                      </span>
                    </div>
                  )}
                  {conflict <= 75 && stability >= 60 && (
                    <div className="text-green-500">
                      ✔️ Xã hội hiện tại đang ở trạng thái cân bằng ổn định tương đối tạm thời.
                    </div>
                  )}
                  {conflict <= 75 && stability < 60 && (
                    <div className="text-yellow-500">
                      ⚠️ Bất ổn âm ỉ. Người lao động đang mất dần kiên nhẫn.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Gameplay Card */}
              <div className="lg:col-span-8 bg-[#1b1b22] border border-soviet-border rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative">
                <AnimatePresence mode="wait">
                  {!gameEnded ? (
                    <motion.div
                      key={round}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col justify-between h-full"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-soviet-gold uppercase tracking-widest bg-soviet-gold/10 px-2 py-0.5 rounded border border-soviet-gold/20">
                            Tình huống {round + 1} / {scenarios.length}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">Quyết định lập pháp</span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-soviet-beige mb-4 leading-snug">
                          {scenarios[round].title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 bg-[#14141a] p-4 rounded-xl border border-soviet-border">
                          {scenarios[round].desc}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {scenarios[round].choices.map((choice, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleChoiceSelect(choice)}
                            className="w-full text-left p-4 rounded-xl bg-[#14141a] hover:bg-soviet-red/10 border border-soviet-border hover:border-soviet-red/50 transition-all duration-300 text-sm text-gray-300 hover:text-white font-semibold flex items-center gap-3 cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-full border border-soviet-red text-soviet-red flex items-center justify-center font-bold text-xs">
                              {idx + 1}
                            </span>
                            {choice.text}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="end"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col justify-between h-full text-center py-6"
                    >
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-soviet-gold mb-4">
                          Kết Quả Giả Lập Xã Hội
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-6">
                          Sau các vòng quyết sách lập pháp, bạn đã định hình cấu trúc xã hội với các chỉ số cuối cùng:
                        </p>

                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8 bg-[#14141a] p-4 rounded-xl border border-soviet-border">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Mâu thuẫn</div>
                            <div className="text-2xl font-bold text-red-500">{conflict}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Đoàn kết Dân tộc</div>
                            <div className="text-2xl font-bold text-green-500">{stability}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Bất bình đẳng</div>
                            <div className="text-2xl font-bold text-yellow-500">{inequality}%</div>
                          </div>
                        </div>

                        {/* Summary evaluation */}
                        <div className="p-5 bg-soviet-red/5 border border-soviet-red/20 rounded-xl max-w-xl mx-auto text-sm text-gray-300 leading-relaxed mb-8">
                          <span className="font-bold text-soviet-gold block mb-1">Kết luận học thuyết lịch sử:</span>
                          {conflict > 70 ? (
                            'Mâu thuẫn giai cấp vượt quá giới hạn. Độc lập kinh tế dân tộc bị đe dọa dẫn đến phong trào cách mạng kết hợp giải phóng dân tộc và giải phóng giai cấp bùng nổ dữ dội để lật đổ trật tự cũ.'
                          ) : inequality > 75 ? (
                            'Khoảng cách giàu nghèo sâu sắc tiếp tục xói mòn lòng tin của nhân dân. Mặc dù tinh thần dân tộc được nêu cao để ổn định xã hội, nhưng sự bóc lột tích tụ sẽ dẫn tới nguy cơ khủng hoảng kép trong tương lai.'
                          ) : (
                            'Bạn đã giữ vững chủ quyền dân tộc đồng thời giảm thiểu khoảng cách giàu nghèo nội tại. Đây là tiền đề vững chắc cho việc xây dựng khối đại đoàn kết dân tộc bền vững trên cơ sở lợi ích của toàn thể nhân dân lao động.'
                          )}
                        </div>
                      </div>

                      <button
                        onClick={resetGame}
                        className="mx-auto flex items-center gap-2 bg-gradient-to-r from-soviet-red to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg border border-soviet-gold/30 transition-transform hover:-translate-y-0.5 text-sm cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" /> Bắt đầu giả lập lại
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Last Result Alert */}
                {!gameEnded && lastResult && (
                  <div className="mt-6 p-3.5 bg-soviet-red/10 border-l-4 border-soviet-red rounded text-xs text-gray-300">
                    <strong>Phản hồi vòng trước:</strong> {lastResult}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
