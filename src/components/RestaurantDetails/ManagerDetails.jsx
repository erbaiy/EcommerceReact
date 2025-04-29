import { User, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const ManagerDetails = ({ manager }) => {

  console.log("Manager Details:", manager);

  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {t("Manager Details")}
      </h2>
      <div className="space-y-2">
        <p className="flex items-center">
          <User size={16} className="mr-2" />
          {manager.fullName}
        </p>
        <p className="flex items-center">
          <Mail size={16} className="mr-2" />
          {manager.email}
        </p>
        <p className="flex items-center">
          <Phone size={16} className="mr-2" />
          {manager.phoneNumber}
        </p>
      </div>
    </div>
  );
};

ManagerDetails.propTypes = {
    manager: PropTypes.object.isRequired,
  };

export default ManagerDetails;