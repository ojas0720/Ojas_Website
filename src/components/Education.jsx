import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { education, achievements, workExperience, certifications } from '../data/personalData';

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="education" className="section-padding bg-primary">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">BACKGROUND</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Achievements</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Education
            </h3>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                  variants={itemVariants}
                >
                  <div className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"></div>
                  <h4 className="text-lg font-medium mb-1">{edu.institution}</h4>
                  <p className="text-muted mb-1">
                    {edu.degree}{edu.field && ` - ${edu.field}`}
                  </p>
                  {edu.graduationDate && (
                    <p className="text-sm font-mono text-light opacity-70">{edu.graduationDate}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-sm text-light opacity-80 mt-1">GPA: {edu.gpa}</p>
                  )}
                  {edu.honors && (
                    <p className="text-sm text-light opacity-80 mt-1">{edu.honors}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Work Experience Section */}
            {workExperience && workExperience.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-medium mb-6 flex items-center">
                  <div className="w-4 h-4 border border-light mr-3"></div>
                  Work Experience
                </h3>
                <div className="space-y-8">
                  {workExperience.map((work, i) => (
                    <motion.div
                      key={i}
                      className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                      variants={itemVariants}
                    >
                      <div className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"></div>
                      <h4 className="text-lg font-medium mb-1">{work.position}</h4>
                      <p className="text-muted mb-1">{work.company}</p>
                      {work.duration && (
                        <p className="text-sm font-mono text-light opacity-70 mb-2">{work.duration}</p>
                      )}
                      {work.responsibilities && work.responsibilities.length > 0 && (
                        <ul className="text-sm text-light opacity-80 space-y-1">
                          {work.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 opacity-60">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <div className="w-4 h-4 border border-light mr-3"></div>
              Achievements
            </h3>

            <ul className="space-y-4">
              {achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-light mt-1 mr-2 opacity-60">⁕</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-6 flex items-center">
                  <div className="w-4 h-4 border border-light mr-3"></div>
                  Certifications
                </h3>
                <div className="space-y-4">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      className="border-l-2 border-muted border-opacity-30 pl-4 relative"
                      variants={itemVariants}
                    >
                      <div className="absolute w-2 h-2 bg-light rounded-full -left-[5px] top-2"></div>
                      <h4 className="text-base font-medium mb-1">{cert.name}</h4>
                      <p className="text-muted text-sm mb-1">{cert.issuer}</p>
                      {cert.date && (
                        <p className="text-xs font-mono text-light opacity-70">{cert.date}</p>
                      )}
                      {cert.credentialId && (
                        <p className="text-xs text-light opacity-60 mt-1">ID: {cert.credentialId}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <motion.div
              className="mt-8 p-4 border border-muted border-opacity-20 bg-secondary bg-opacity-30"
              variants={itemVariants}
            >
              <h4 className="text-sm font-medium mb-2">Continuous Learning</h4>
              <p className="text-muted text-sm">
                Always exploring new technologies and participating in hackathons
                to expand my knowledge and practical experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;